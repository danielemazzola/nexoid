import { CONSENT_DAYS, CONSENT_VERSION, COOKIE_NAMES } from "../../data/cookies";
import { deleteCookie, getCookie, randomId, setCookie } from "../../utils/cookies";
import { sendBeacon } from "../../services/beacon";

export interface ConsentChoices {
  analytics: boolean;
}

export type ConsentAction = "accept_all" | "reject_all" | "custom";

export interface ConsentState extends ConsentChoices {
  /** Identificador aleatorio del registro de consentimiento (prueba ante la AEPD) */
  id: string;
  version: string;
  /** ISO 8601 */
  date: string;
}

/** Lee la decisión guardada. Devuelve null si no existe, está corrupta o es de otra versión. */
export const readConsent = (): ConsentState | null => {
  const raw = getCookie(COOKIE_NAMES.consent);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
};

/** Guarda la decisión, limpia lo que ya no está permitido y registra el consentimiento en la API. */
export const writeConsent = (choices: ConsentChoices, action: ConsentAction): ConsentState => {
  const previous = readConsent();
  const state: ConsentState = {
    id: previous?.id ?? randomId(),
    version: CONSENT_VERSION,
    date: new Date().toISOString(),
    analytics: choices.analytics,
  };

  setCookie(COOKIE_NAMES.consent, JSON.stringify(state), CONSENT_DAYS);

  // Retirada del consentimiento: borrar inmediatamente los identificadores analíticos
  if (!state.analytics) {
    deleteCookie(COOKIE_NAMES.visitor);
    try {
      sessionStorage.removeItem(COOKIE_NAMES.session);
    } catch {
      /* sessionStorage no disponible */
    }
  }

  // Registro del consentimiento (art. 7.1 RGPD: el responsable debe poder demostrarlo)
  sendBeacon("/api/consent", {
    consentId: state.id,
    version: state.version,
    action,
    choices: { analytics: state.analytics },
    date: state.date,
    path: location.pathname,
  });

  return state;
};
