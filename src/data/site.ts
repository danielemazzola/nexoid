/** Datos globales del sitio: marca, navegación y enlaces legales. */

import type { SiteData } from "../types/content";

const site: SiteData = {
  name: "NexoID",
  email: "help@nexoid.es",
  website: "https://nexoid.es",
  tagline: "Especialistas en seguridad de identidad con Microsoft Entra ID.",

  /**
   * Datos del titular para el Aviso legal y la Política de privacidad (art. 10 LSSI).
   * `registry` solo aplica a sociedades inscritas en el Registro Mercantil: si no existe, se omite.
   */
  owner: {
    name: "Daniele Mazzola",
    nif: "Y5816999Z",
    address: "Alicante, España",
  },

  navigation: [
    { id: "nav-home", title: "Inicio", path: "/" },
    { id: "nav-services", title: "Servicios", path: "/servicios" },
    { id: "nav-pricing", title: "Precios", path: "/precios" },
    { id: "nav-about", title: "Quiénes somos", path: "/quienes-somos" },
    { id: "nav-blog", title: "Blog", path: "/blog" },
    { id: "nav-contact", title: "Contacto", path: "/contacto" },
  ],

  cta: { text: "Solicitar auditoría", href: "/contacto" },

  legal: [
    { id: "legal-1", title: "Aviso legal", path: "/legal" },
    { id: "legal-2", title: "Privacidad", path: "/privacidad" },
    { id: "legal-3", title: "Cookies", path: "/cookies" },
  ],

  stack: ["Microsoft Entra ID", "Microsoft 365", "Microsoft Graph", "PowerShell", "Entra Connect"],
};

export default site;
