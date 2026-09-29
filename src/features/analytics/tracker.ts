import { COOKIE_NAMES, CONSENT_DAYS } from "../../data/cookies";
import { getCookie, randomId, setCookie } from "../../utils/cookies";
import { sendBeacon } from "../../services/beacon";

/**
 * Registro de accesos en dos niveles:
 *
 * 1. SIN consentimiento → visita anónima y agregable: ruta, dominio de procedencia,
 *    tipo de dispositivo e idioma. Sin cookies, sin identificadores y sin IP guardada
 *    (el backend NO debe almacenar la IP). No accede al terminal del usuario (art. 22.2 LSSI).
 *
 * 2. CON consentimiento analítico → además, un id de visitante (cookie propia) y uno de
 *    sesión (sessionStorage) para contar visitantes únicos, sesiones y recorridos.
 */

export interface PageViewEvent {
  type: "pageview";
  path: string;
  title: string;
  referrer: string | null;
  device: "mobile" | "tablet" | "desktop";
  lang: string;
  screen: string;
  consent: boolean;
  visitorId?: string;
  sessionId?: string;
  ts: string;
}

const deviceType = (): PageViewEvent["device"] => {
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

const getVisitorId = (): string => {
  let id = getCookie(COOKIE_NAMES.visitor);
  if (!id) {
    id = randomId();
  }
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

export const trackPageView = (path: string, analyticsConsent: boolean): void => {
  const event: PageViewEvent = {
    type: "pageview",
    path,
    title: document.title,
    referrer: referrerHost(),
    device: deviceType(),
    lang: navigator.language?.slice(0, 2) ?? "es",
    screen: `${Math.round(window.innerWidth / 100) * 100}`,
    consent: analyticsConsent,
    ts: new Date().toISOString(),
  };

  if (analyticsConsent) {
    event.visitorId = getVisitorId();
    event.sessionId = getSessionId();
  }

  sendBeacon("/api/track", event);
};
