/**
 * Inventario de cookies y almacenamiento del sitio.
 * Es la ÚNICA fuente de verdad: lo usan el panel de preferencias y la Política de cookies.
 * Si añades una cookie o un servicio de terceros, regístralo aquí.
 */

export type CookieCategory = "necessary" | "analytics";

export interface CookieDefinition {
  name: string;
  category: CookieCategory;
  provider: string;
  purpose: string;
  duration: string;
  type: "Cookie" | "sessionStorage";
}

export interface CategoryDefinition {
  id: CookieCategory;
  title: string;
  description: string;
  required: boolean;
}

/** Versión de la política. Súbela cuando cambien las finalidades: se volverá a pedir consentimiento. */
export const CONSENT_VERSION = "2026-09-30";

/** Días que se conserva la decisión del usuario antes de volver a preguntar (AEPD: máx. 24 meses). */
export const CONSENT_DAYS = 365;

export const COOKIE_NAMES = {
  consent: "nx_consent",
  visitor: "nx_vid",
  session: "nx_sid",
  attribution: "nx_attr",
} as const;

export const categories: CategoryDefinition[] = [
  {
    id: "necessary",
    title: "Técnicas (necesarias)",
    description:
      "Imprescindibles para que la web funcione y para recordar tu decisión sobre las cookies. No requieren consentimiento y no se pueden desactivar.",
    required: true,
  },
  {
    id: "analytics",
    title: "Analíticas",
    description:
      "Nos permiten contar visitantes únicos y sesiones para saber cómo se usa la web y mejorarla. Los datos son propios, no se ceden a terceros ni se usan con fines publicitarios.",
    required: false,
  },
];

export const cookies: CookieDefinition[] = [
  {
    name: COOKIE_NAMES.consent,
    category: "necessary",
    provider: "NexoID (propia)",
    purpose: "Guarda tus preferencias de cookies y la versión de la política aceptada.",
    duration: "12 meses",
    type: "Cookie",
  },
  {
    name: COOKIE_NAMES.visitor,
    category: "analytics",
    provider: "NexoID (propia)",
    purpose: "Identificador aleatorio para distinguir visitantes únicos. No contiene datos personales.",
    duration: "12 meses",
    type: "Cookie",
  },
  {
    name: COOKIE_NAMES.session,
    category: "analytics",
    provider: "NexoID (propia)",
    purpose: "Identificador aleatorio de la sesión de navegación actual.",
    duration: "Hasta cerrar la pestaña",
    type: "sessionStorage",
  },
  {
    name: COOKIE_NAMES.attribution,
    category: "analytics",
    provider: "NexoID (propia)",
    purpose: "Recuerda cómo llegaste a la web (primera página, web de procedencia y campaña) si recargas la página.",
    duration: "Hasta cerrar la pestaña",
    type: "sessionStorage",
  },
];
