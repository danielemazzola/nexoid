import { COOKIE_NAMES, CONSENT_DAYS } from "../../data/cookies";
import { getCookie, randomId, setCookie } from "../../utils/cookies";
import { sendBeacon } from "../../services/beacon";

/**
 * Registro de accesos en dos niveles:
 *
 * 1. SIN consentimiento → visita anónima: ruta, procedencia (solo dominio), campaña (utm_*), dispositivo,
 *    idioma, tiempo activo, scroll y tiempo de lectura por sección. Sin cookies ni identificadores de persona
 *    y sin IP guardada (el backend deduce país/ciudad y la descarta). No accede al terminal (art. 22.2 LSSI).
 *
 * 2. CON consentimiento analítico → además, un id de visitante (cookie propia) y uno de sesión
 *    (sessionStorage) para contar visitantes únicos, sesiones y recorridos.
 *
 * Cada visita a una página tiene un `viewId` aleatorio: agrupa sus latidos, no identifica a nadie.
 */

type Device = "mobile" | "tablet" | "desktop";

export interface Attribution {
  landingPath: string;
  referrer: string | null;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

const HEARTBEAT_MS = 30_000;

const deviceType = (): Device => {
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1100) return "tablet";
  return "desktop";
};

/** Solo el dominio de procedencia (nunca la URL completa, que puede contener datos). */
const referrerHost = (): string | null => {
  if (!document.referrer) return null;
  try {
    const host = new URL(document.referrer).hostname;
    return host === location.hostname ? null : host;
  } catch {
    return null;
  }
};

const readUtm = () => {
  const params = new URLSearchParams(location.search);
  const pick = (key: string) => params.get(key)?.slice(0, 100) || undefined;
  return {
    utmSource: pick("utm_source"),
    utmMedium: pick("utm_medium"),
    utmCampaign: pick("utm_campaign"),
    utmTerm: pick("utm_term"),
    utmContent: pick("utm_content"),
  };
};

const getVisitorId = (): string => {
  const id = getCookie(COOKIE_NAMES.visitor) ?? randomId();
  // Se renueva la caducidad en cada visita, dentro del plazo del consentimiento
  setCookie(COOKIE_NAMES.visitor, id, CONSENT_DAYS);
  return id;
};

const getSessionId = (): string | undefined => {
  try {
    let id = sessionStorage.getItem(COOKIE_NAMES.session);
    if (!id) {
      id = randomId();
      sessionStorage.setItem(COOKIE_NAMES.session, id);
    }
    return id;
  } catch {
    return undefined;
  }
};

// ---------- Origen de la visita (primer toque), solo en memoria: se pierde al recargar ----------

let attribution: Attribution | null = null;

/** Primera página, procedencia y campaña de esta visita. Se adjunta al formulario de contacto. */
export const getAttribution = (): Attribution | null => attribution;

// ---------- Visita en curso: tiempo activo, scroll y lectura por secciones ----------

interface ActiveView {
  id: string;
  activeMs: number;
  activeSince: number | null; // null mientras la pestaña está oculta
  maxScroll: number;
  sections: Map<string, { ms: number; since: number | null; visible: boolean }>;
  observer: IntersectionObserver | null;
}

let view: ActiveView | null = null;
let heartbeat: number | undefined;
let listening = false;

const now = () => performance.now();

/** Nombre legible de una sección: data-section, id o su título. */
const sectionName = (element: Element): string | null => {
  const explicit = element.getAttribute("data-section") || element.id;
  if (explicit) return explicit.slice(0, 60);
  const heading = element.querySelector("h1, h2")?.textContent?.replace(/\s+/g, " ").trim();
  return heading ? heading.slice(0, 60) : null;
};

const updateScroll = () => {
  if (!view) return;
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - window.innerHeight;
  const depth = scrollable <= 0 ? 100 : Math.round(((window.scrollY + window.innerHeight) / doc.scrollHeight) * 100);
  view.maxScroll = Math.max(view.maxScroll, Math.min(100, depth));
};

/** Cierra los intervalos abiertos (tiempo activo y secciones visibles) hasta `at`. */
const settle = (at: number) => {
  if (!view) return;
  if (view.activeSince !== null) {
    view.activeMs += at - view.activeSince;
    view.activeSince = at;
  }
  for (const entry of view.sections.values()) {
    if (entry.since !== null) {
      entry.ms += at - entry.since;
      entry.since = at;
    }
  }
};

const sendEngagement = () => {
  if (!view) return;
  settle(now());
  const sections: Record<string, number> = {};
  for (const [name, entry] of view.sections) if (entry.ms >= 500) sections[name] = Math.round(entry.ms);
  sendBeacon("/api/track", {
    type: "engagement",
    viewId: view.id,
    durationMs: Math.round(view.activeMs),
    scrollDepth: view.maxScroll,
    sections,
  });
};

const observeSections = (current: ActiveView) => {
  if (!("IntersectionObserver" in window)) return;
  // Una sección cuenta como "leída" mientras ocupa al menos la mitad de la pantalla o se ve casi entera
  const observer = new IntersectionObserver(
    (entries) => {
      const at = now();
      for (const entry of entries) {
        const name = sectionName(entry.target);
        if (!name) continue;
        const record = current.sections.get(name) ?? { ms: 0, since: null, visible: false };
        const visibleEnough =
          entry.intersectionRect.height >= window.innerHeight * 0.5 || entry.intersectionRatio >= 0.8;
        record.visible = visibleEnough;
        if (visibleEnough && record.since === null && current.activeSince !== null) record.since = at;
        if (!visibleEnough && record.since !== null) {
          record.ms += at - record.since;
          record.since = null;
        }
        current.sections.set(name, record);
      }
    },
    { threshold: [0, 0.2, 0.4, 0.5, 0.6, 0.8, 1] },
  );
  document.querySelectorAll("main section, main [data-section]").forEach((element) => observer.observe(element));
  current.observer = observer;
};

const onVisibility = () => {
  if (!view) return;
  if (document.visibilityState === "hidden") {
    sendEngagement();
    settle(now());
    view.activeSince = null;
    for (const entry of view.sections.values()) entry.since = null;
  } else {
    const at = now();
    view.activeSince = at;
    for (const entry of view.sections.values()) if (entry.visible) entry.since = at;
  }
};

const startListening = () => {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", updateScroll, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pagehide", sendEngagement);
};

const endView = () => {
  if (!view) return;
  sendEngagement();
  view.observer?.disconnect();
  window.clearInterval(heartbeat);
  view = null;
};

export const trackPageView = (path: string, analyticsConsent: boolean): void => {
  endView(); // cierra la página anterior (navegación dentro de la web)
  startListening();

  const utm = readUtm();
  const referrer = referrerHost();
  attribution ??= {
    landingPath: path,
    referrer,
    utmSource: utm.utmSource,
    utmMedium: utm.utmMedium,
    utmCampaign: utm.utmCampaign,
  };

  const current: ActiveView = {
    id: randomId(),
    activeMs: 0,
    activeSince: document.visibilityState === "visible" ? now() : null,
    maxScroll: 0,
    sections: new Map(),
    observer: null,
  };
  view = current;
  updateScroll();

  sendBeacon("/api/track", {
    type: "pageview",
    viewId: current.id,
    path,
    title: document.title,
    referrer,
    device: deviceType(),
    lang: navigator.language?.slice(0, 2) ?? "es",
    screen: `${Math.round(window.innerWidth / 100) * 100}`,
    consent: analyticsConsent,
    ...(analyticsConsent ? { visitorId: getVisitorId(), sessionId: getSessionId() } : {}),
    ...utm,
  });

  observeSections(current);
  // Latido: mantiene la visita "en directo" en el dashboard y guarda el progreso aunque se cierre de golpe
  heartbeat = window.setInterval(() => {
    if (document.visibilityState === "visible") sendEngagement();
  }, HEARTBEAT_MS);
};
