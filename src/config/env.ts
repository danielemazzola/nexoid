/** Variables de entorno del front (definidas en .env como VITE_*). */
export const ENV = {
  /**
   * URL base de la API (backend). En desarrollo, por defecto el backend local (puerto 4000).
   * En producción se define VITE_API_URL en Vercel; si está vacía, no se envían datos.
   */
  API_URL: (import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:4000" : "")).replace(/\/$/, ""),
  IS_DEV: import.meta.env.DEV,
} as const;
