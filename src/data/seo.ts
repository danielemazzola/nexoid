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
    title: "Servicios y precios de seguridad en Microsoft Entra ID",
    description:
      "Auditoría desde 990 €, soporte Identity Care, acceso seguro con MFA y acceso condicional, identidad híbrida y automatización. Precios claros para pymes.",
  },
  pricing: {
    title: "Planes y precios · Seguridad en Microsoft Entra ID",
    description:
      "Planes para proteger Microsoft Entra ID en PYMEs: demo gratuita de 14 días, Básica, Estándar y VIP. Mensual o anual, sin permanencia. Compara y elige.",
  },
  about: {
    title: "Quiénes somos · Especialistas en identidad digital",
    description:
      "Consultores especializados en Microsoft Entra ID con más de 3.000 incidencias resueltas. Soporte cercano y en español para entornos cloud e híbridos.",
  },
  blog: {
    title: "Blog de seguridad en Microsoft Entra ID y Microsoft 365",
    description:
      "Guías prácticas de Microsoft Entra ID: MFA, acceso condicional, PIM, passkeys, invitados y dominios en Microsoft 365, pensadas para administradores de pymes.",
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
