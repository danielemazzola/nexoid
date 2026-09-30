/**
 * Catálogo de servicios con precios (página /servicios y datos estructurados).
 * Precios en euros, sin IVA. `from: true` = precio "desde". Sin `price` = a medida.
 * `topic` es el tema del formulario de contacto que se preselecciona (ids de data/contact.ts).
 */
import type { ContactTopicId } from "./contact";

export interface ServiceOption {
  name: string;
  detail: string;
  price?: number;
  from?: boolean;
}

export interface CatalogService {
  id: string;
  topic: ContactTopicId;
  icon: "radar" | "users" | "lock" | "cloud" | "terminal";
  name: string;
  tagline: string;
  forWhom: string;
  includes: string[];
  options: ServiceOption[];
  note?: string;
}

const catalog = {
  eyebrow: "Servicios y precios",
  title: "Elige cómo quieres que te ayudemos",
  description:
    "Cinco líneas de servicio especializadas en Microsoft Entra ID y Microsoft 365, con precios claros. Si no sabes por dónde empezar, empieza por la auditoría.",
  vatNote: "Precios sin IVA. Presupuesto cerrado antes de empezar: sin sorpresas.",
  from: "desde",
  custom: "A medida",
  cta: "Solicitar",
  includesTitle: "Qué incluye",

  services: [
    {
      id: "auditoria",
      topic: "auditoria",
      icon: "radar",
      name: "Auditoría y diagnóstico de identidad",
      tagline: "Sabrás exactamente cómo está tu Microsoft Entra ID y qué hacer primero.",
      forWhom: "Para empresas que quieren una foto real de su seguridad antes de invertir.",
      includes: [
        "MFA, métodos de autenticación, acceso condicional y valores predeterminados de seguridad",
        "Cuentas de emergencia (break glass), PIM y administradores globales",
        "Usuarios y inicios de sesión con riesgo",
        "Usuarios, invitados y cuentas inactivas",
        "Dominios, UPN, alias y atributos",
        "Grupos dinámicos y licencias por grupo",
        "Entra Connect: errores de sincronización, atributos duplicados y ancla de origen",
        "Registros de auditoría e inicio de sesión",
        "Oportunidades de automatización",
        "Informe ejecutivo y hoja de ruta priorizada",
      ],
      options: [
        { name: "Esencial", detail: "Hasta 50 usuarios, entornos solo en la nube", price: 990 },
        { name: "Completa", detail: "Hasta 250 usuarios, incluye identidad híbrida y presentación de resultados", price: 1890 },
        { name: "Más de 250 usuarios", detail: "Alcance y calendario a medida" },
      ],
    },
    {
      id: "identity-care",
      topic: "incidencia",
      icon: "users",
      name: "Identity Care",
      tagline: "Un especialista en identidad cuando lo necesitas, sin contratarlo en plantilla.",
      forWhom: "Para empresas con IT interno o proveedor que necesitan ayuda experta puntual.",
      includes: [
        "Usuarios bloqueados y recuperación de acceso",
        "Problemas con MFA y Microsoft Authenticator",
        "Usuarios duplicados, cambios de UPN y alias",
        "Invitados y colaboración externa",
        "Verificación de dominios",
        "Incidencias de autenticación y análisis de registros",
        "Gestión y escalado de incidencias con Microsoft",
      ],
      options: [
        { name: "Bono 5 horas", detail: "Validez 12 meses", price: 425 },
        { name: "Bono 10 horas", detail: "Validez 12 meses", price: 790 },
        { name: "Bono 20 horas", detail: "Validez 12 meses", price: 1490 },
      ],
      note: "Urgencias fuera del horario laboral: +50 %.",
    },
    {
      id: "secure-access",
      topic: "mfa-acceso-condicional",
      icon: "lock",
      name: "Secure Access",
      tagline: "Menos privilegios, más protección: el acceso bajo control.",
      forWhom: "Para empresas que quieren cerrar las puertas que más usan los atacantes.",
      includes: [
        "MFA y métodos sin contraseña: passkeys y llaves FIDO2",
        "Acceso condicional y valores predeterminados de seguridad",
        "Cuentas de emergencia (break glass)",
        "Revisión de administradores globales, roles permanentes y mínimo privilegio",
        "PIM y permisos delegados",
        "Usuarios e inicios de sesión con riesgo",
        "Acceso remoto Zero Trust: Microsoft Entra Private Access o VPN con Entra ID",
        "Gobierno de accesos y revisiones periódicas",
      ],
      options: [
        { name: "Base", detail: "Hasta 50 usuarios: MFA, acceso condicional, cuentas de emergencia y administradores", price: 1490, from: true },
        { name: "Avanzado", detail: "Añade PIM, Identity Protection y gobierno de accesos", price: 2490, from: true },
        { name: "Acceso remoto Zero Trust", detail: "Sustituir o proteger la VPN con Microsoft Entra ID" },
      ],
    },
    {
      id: "hybrid-identity",
      topic: "identidad-hibrida",
      icon: "cloud",
      name: "Hybrid Identity",
      tagline: "Active Directory y Microsoft Entra ID trabajando juntos, sin errores.",
      forWhom: "Para empresas que mantienen Active Directory en sus servidores.",
      includes: [
        "Entra Connect Sync y Cloud Sync",
        "Diagnóstico de errores de sincronización",
        "Atributos duplicados, ancla de origen, UPN y atributos",
        "Autoservicio de contraseñas con escritura diferida",
        "Problemas entre la nube y el entorno local",
        "Planificación de la migración a solo nube",
      ],
      options: [
        { name: "Diagnóstico de sincronización", detail: "Errores, duplicados y configuración de Entra Connect", price: 590 },
        { name: "SSPR con escritura diferida", detail: "Autoservicio de contraseñas que llega al AD local", price: 690 },
        { name: "Migración a solo nube", detail: "Planificación y ejecución por fases", price: 2900, from: true },
      ],
    },
    {
      id: "automation",
      topic: "automatizacion",
      icon: "terminal",
      name: "Automation & Governance",
      tagline: "Lo repetitivo, automatizado y documentado.",
      forWhom: "Para equipos que pierden horas en tareas manuales de administración.",
      includes: [
        "PowerShell, Microsoft Graph y Graph Explorer",
        "Operaciones masivas desde CSV",
        "Altas, bajas y cambios automatizados",
        "Gestión de usuarios, grupos y asignación de licencias",
        "Revisión de permisos",
        "Detección de procesos repetitivos que se pueden automatizar",
      ],
      options: [
        { name: "Automatización puntual", detail: "Un script documentado con guía de uso", price: 390, from: true },
        { name: "Proceso de altas, bajas y cambios", detail: "De extremo a extremo, con licencias y grupos", price: 1290, from: true },
      ],
    },
  ] as CatalogService[],
};

/** 1890 → "1.890 €" */
export const euros = (value: number) => `${value.toLocaleString("es-ES", { useGrouping: "always" as unknown as boolean })} €`;

export default catalog;
