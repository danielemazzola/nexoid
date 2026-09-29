/**
 * Títulos y descripciones por página.
 * Buenas prácticas para Bing y Google:
 * - title: 50–60 caracteres, palabra clave principal al principio.
 * - description: 140–160 caracteres, con beneficio y llamada a la acción.
 * Si cambias rutas, actualiza también public/sitemap.xml.
 */

interface PageSeo {
  title: string;
  description: string;
}

const seo: Record<string, PageSeo> = {
  home: {
    title: "Seguridad en Microsoft Entra ID para PYMEs | NexoID",
    description:
      "Auditorías, consultoría y automatización de Microsoft Entra ID y Microsoft 365 para PYMEs. MFA, acceso condicional y PIM. Solicita tu auditoría inicial.",
  },
  services: {
    title: "Auditoría y consultoría de Microsoft Entra ID",
    description:
      "Auditoría del tenant, configuración de MFA, acceso condicional, PIM e Identity Protection, y automatización con PowerShell y Microsoft Graph.",
  },
  about: {
    title: "Quiénes somos · Especialistas en identidad digital",
    description:
      "Consultores especializados en Microsoft Entra ID con más de 3.000 incidencias resueltas. Soporte cercano y en español para entornos cloud e híbridos.",
  },
  blog: {
    title: "Blog de seguridad en Microsoft Entra ID y Microsoft 365",
    description:
      "Guías prácticas sobre Microsoft Entra ID, MFA, acceso condicional, PIM, PowerShell y Microsoft Graph para administradores de PYMEs.",
  },
  contact: {
    title: "Contacto · Solicita una auditoría de Microsoft Entra ID",
    description:
      "Cuéntanos tu entorno de Microsoft 365 y te proponemos una auditoría inicial de Microsoft Entra ID con un plan de acción priorizado.",
  },
  notFound: {
    title: "Página no encontrada",
    description: "La página que buscas no existe o se ha movido.",
  },
};

export default seo;
