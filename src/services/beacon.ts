import { ENV } from "../config/env";

/**
 * Envía datos a la API sin bloquear la navegación.
 * Usa sendBeacon cuando existe (sobrevive al cierre de pestaña) y fetch keepalive como respaldo.
 */
export const sendBeacon = (endpoint: string, payload: unknown): void => {
  if (!ENV.API_URL) {
    if (ENV.IS_DEV) console.debug(`[api] ${endpoint}`, payload);
    return;
  }

  const url = `${ENV.API_URL}${endpoint}`;
  const body = JSON.stringify(payload);
  // text/plain es un tipo "simple": no dispara preflight CORS y sendBeacon lo admite en todos los navegadores
  const contentType = "text/plain;charset=UTF-8";

  try {
    if (navigator.sendBeacon?.(url, new Blob([body], { type: contentType }))) return;
  } catch {
    /* continúa con fetch */
  }

  fetch(url, {
    method: "POST",
    body,
    headers: { "Content-Type": contentType },
    keepalive: true,
    credentials: "omit",
  }).catch(() => {
    /* el registro nunca debe romper la web */
  });
};
