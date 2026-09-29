/**
 * Contenido de la web de NexoID.
 * Todo el texto visible de la home y de las páginas sale de aquí:
 * para cambiar un texto, edítalo en este archivo.
 */

import type { CompanyData } from "../types/content";

const company: CompanyData = {
  hero: {
    badge: "Especialistas en Microsoft Entra ID",
    titleStart: "Protegemos la",
    titleHighlight: "identidad digital",
    titleEnd: "de tu empresa.",
    subtitle:
      "Ayudamos a PYMEs a mejorar la seguridad, gobernanza y administración de Microsoft Entra ID y Microsoft 365 mediante auditorías, consultoría especializada y automatización.",
    primaryButton: { text: "Solicita una auditoría inicial", href: "/contacto" },
    secondaryButton: { text: "Conoce nuestros servicios", href: "/servicios" },
  },

  // Consola animada del hero (vista de ejemplo, no son datos reales)
  console: {
    title: "entra-id · auditoría",
    label: "Vista de ejemplo",
    lines: [
      { status: "run", text: "Conectando con Microsoft Graph…" },
      { status: "ok", text: "MFA aplicado a administradores" },
      { status: "warn", text: "Roles con privilegios excesivos" },
      { status: "ok", text: "Directivas de acceso condicional" },
      { status: "warn", text: "Usuarios invitados sin revisar" },
      { status: "ok", text: "Cuentas break glass configuradas" },
    ],
    scoreLabel: "Postura de identidad",
    scoreFrom: 58,
    scoreTo: 94,
  },

  stats: [
    { id: "stat-1", value: "+3.000", label: "incidencias resueltas" },
    { id: "stat-2", value: "100%", label: "foco en Microsoft Entra ID" },
    { id: "stat-3", value: "Cloud + Híbrido", label: "entornos soportados" },
    { id: "stat-4", value: "ES", label: "soporte cercano en español" },
  ],

  problems: {
    eyebrow: "Qué resolvemos",
    title: "Problemas que resolvemos",
    description:
      "Detectamos, analizamos y solucionamos incidencias relacionadas con Microsoft Entra ID antes de que afecten a la seguridad o productividad de tu empresa.",
    items: [
      { id: "problem-1", text: "Usuarios bloqueados", level: "warn" },
      { id: "problem-2", text: "Problemas con MFA", level: "risk" },
      { id: "problem-3", text: "Acceso condicional", level: "risk" },
      { id: "problem-4", text: "Administradores con privilegios excesivos", level: "risk" },
      { id: "problem-5", text: "Errores de sincronización", level: "warn" },
      { id: "problem-6", text: "Usuarios duplicados", level: "warn" },
      { id: "problem-7", text: "Recuperación de dominios", level: "risk" },
      { id: "problem-8", text: "Configuración de PIM", level: "warn" },
      { id: "problem-9", text: "Security Defaults", level: "warn" },
      { id: "problem-10", text: "Creación de usuarios", level: "info" },
      { id: "problem-11", text: "Cuentas break glass", level: "risk" },
      { id: "problem-12", text: "Usuarios invitados", level: "warn" },
      { id: "problem-13", text: "Buenas prácticas", level: "info" },
    ],
  },

  services: {
    eyebrow: "Servicios",
    title: "Nuestros servicios",
    description:
      "Servicios especializados diseñados para mejorar la seguridad, administración y gobernanza de Microsoft Entra ID.",
    button: { text: "Ver todos los servicios", href: "/servicios" },
    items: [
      {
        id: "service-1",
        icon: "radar",
        tag: "Auditoría",
        title: "Auditoría de Microsoft Entra ID",
        description:
          "Revisamos a fondo tu entorno de identidades: usuarios, roles, MFA, acceso condicional e invitados. Recibes un informe técnico con un plan de acción priorizado.",
        points: ["Revisión completa del tenant", "Informe técnico", "Plan de acción priorizado"],
      },
      {
        id: "service-2",
        icon: "shield",
        tag: "Consultoría",
        title: "Consultoría especializada",
        description:
          "Resolvemos incidencias y te acompañamos en la configuración segura de MFA, acceso condicional, PIM, Security Defaults y entornos híbridos.",
        points: ["Resolución de incidencias", "Configuración segura", "Entornos cloud e híbridos"],
      },
      {
        id: "service-3",
        icon: "terminal",
        tag: "Automatización",
        title: "Automatización con PowerShell y Graph",
        description:
          "Automatizamos tareas repetitivas de administración (altas, bajas, informes y revisiones) con PowerShell y Microsoft Graph.",
        points: ["Altas y bajas automáticas", "Informes programados", "Menos errores manuales"],
      },
    ],
  },

  solutions: {
    eyebrow: "Protección de identidad",
    title: "Soluciones que implantamos",
    description:
      "Configuramos y gobernamos las capacidades de seguridad de Microsoft Entra ID que tu empresa ya tiene (o puede tener) en su licencia.",
    licenseNote: "Licencia mínima orientativa. Lo revisamos contigo en la auditoría.",
    items: [
      {
        id: "solution-1",
        icon: "fingerprint",
        title: "MFA y acceso sin contraseña",
        description:
          "Autenticación multifactor con Microsoft Authenticator, passkeys o llaves FIDO2 para que una contraseña robada no baste.",
        license: "Todas",
      },
      {
        id: "solution-2",
        icon: "shield",
        title: "Acceso condicional",
        description:
          "Directivas que deciden quién entra, desde dónde y con qué dispositivo, según el riesgo de cada inicio de sesión.",
        license: "Entra ID P1",
      },
      {
        id: "solution-3",
        icon: "key",
        title: "Privileged Identity Management",
        description:
          "Roles de administrador bajo demanda y con caducidad: nadie tiene privilegios permanentes que no necesita.",
        license: "Entra ID P2",
      },
      {
        id: "solution-4",
        icon: "radar",
        title: "Identity Protection",
        description:
          "Detección de cuentas comprometidas e inicios de sesión sospechosos, con respuesta automática ante el riesgo.",
        license: "Entra ID P2",
      },
      {
        id: "solution-5",
        icon: "users",
        title: "Invitados y revisiones de acceso",
        description:
          "Control de usuarios externos y revisiones periódicas para retirar accesos que ya no deberían existir.",
        license: "Entra ID P2",
      },
      {
        id: "solution-6",
        icon: "bolt",
        title: "Autoservicio de contraseñas",
        description:
          "Los usuarios recuperan su cuenta de forma segura sin abrir una incidencia, lo que reduce los tickets de soporte.",
        license: "Entra ID P1",
      },
      {
        id: "solution-7",
        icon: "cloud",
        title: "Identidad híbrida",
        description:
          "Sincronización fiable entre Active Directory local y la nube con Entra Connect, sin duplicados ni errores.",
        license: "Incluida",
      },
      {
        id: "solution-8",
        icon: "lock",
        title: "Cuentas de emergencia y bastionado",
        description:
          "Cuentas break glass, Security Defaults y configuración base alineada con las buenas prácticas de Microsoft.",
        license: "Todas",
      },
    ],
  },

  target: {
    eyebrow: "Para quién",
    title: "¿A quién ayudamos?",
    description:
      "Trabajamos con pequeñas y medianas empresas que utilizan Microsoft 365 y desean mejorar la gestión y seguridad de sus identidades digitales.",
    items: [
      { id: "target-1", text: "Asesorías", icon: "calculator" },
      { id: "target-2", text: "Clínicas", icon: "pulse" },
      { id: "target-3", text: "Ingenierías", icon: "compass" },
      { id: "target-4", text: "Despachos de abogados", icon: "scale" },
      { id: "target-5", text: "Empresas de servicios", icon: "briefcase" },
      { id: "target-6", text: "Cualquier PYME con Microsoft 365", icon: "building" },
    ],
  },

  why: {
    eyebrow: "Por qué NexoID",
    title: "¿Por qué NexoID?",
    description:
      "Porque somos especialistas en identidad digital. No hacemos de todo; hacemos una cosa y la hacemos muy bien.",
    items: [
      { id: "why-1", icon: "key", text: "Especialización en Microsoft Entra ID" },
      { id: "why-2", icon: "check", text: "Más de 3.000 incidencias resueltas" },
      { id: "why-3", icon: "code", text: "Automatización mediante PowerShell y Microsoft Graph" },
      { id: "why-4", icon: "chat", text: "Soporte cercano y en español" },
      { id: "why-5", icon: "cloud", text: "Experiencia con entornos cloud e híbridos" },
    ],
  },

  process: {
    eyebrow: "Metodología",
    title: "Cómo trabajamos",
    items: [
      {
        id: "step-1",
        step: "01",
        icon: "search",
        title: "Analizamos",
        description: "Realizamos una auditoría completa del entorno Microsoft Entra ID.",
      },
      {
        id: "step-2",
        step: "02",
        icon: "radar",
        title: "Detectamos",
        description: "Identificamos riesgos, malas prácticas y oportunidades de mejora.",
      },
      {
        id: "step-3",
        step: "03",
        icon: "clipboard",
        title: "Proponemos",
        description: "Entregamos un informe técnico con un plan de acción priorizado.",
      },
      {
        id: "step-4",
        step: "04",
        icon: "bolt",
        title: "Implementamos",
        description: "Aplicamos las mejoras necesarias y automatizamos tareas repetitivas.",
      },
    ],
  },

  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Resolvemos tus dudas",
    items: [
      {
        id: "faq-1",
        question: "¿Qué es Microsoft Entra ID?",
        answer:
          "Es el servicio de identidad y acceso de Microsoft (antes Azure Active Directory). Gestiona los usuarios, contraseñas, MFA y permisos con los que tu equipo accede a Microsoft 365 y a otras aplicaciones.",
      },
      {
        id: "faq-2",
        question: "¿Qué incluye la auditoría inicial?",
        answer:
          "Analizamos tu entorno de Microsoft Entra ID, detectamos riesgos y malas prácticas y te entregamos un informe técnico con un plan de acción priorizado. Si quieres, después implementamos las mejoras.",
      },
      {
        id: "faq-3",
        question: "¿Necesito licencias adicionales?",
        answer:
          "Depende de lo que quieras activar. El MFA está disponible en todas las licencias; el acceso condicional requiere Entra ID P1 (incluido, por ejemplo, en Microsoft 365 Business Premium) y PIM o Identity Protection requieren P2. En la auditoría revisamos qué tienes y qué te compensa.",
      },
      {
        id: "faq-4",
        question: "¿Trabajáis con entornos híbridos?",
        answer:
          "Sí. Tenemos experiencia con entornos solo cloud e híbridos, incluida la sincronización entre Active Directory local y Microsoft Entra ID mediante Entra Connect.",
      },
      {
        id: "faq-5",
        question: "¿Podéis automatizar tareas de administración?",
        answer:
          "Sí. Automatizamos altas, bajas, informes y revisiones periódicas con PowerShell y Microsoft Graph para reducir el trabajo manual y los errores.",
      },
    ],
  },

  cta: {
    title: "¿Preparado para conocer el estado real de tu identidad digital?",
    description:
      "Solicita una auditoría inicial y descubre cómo mejorar la seguridad y administración de Microsoft Entra ID.",
    button: { text: "Solicitar auditoría", href: "/contacto" },
  },
};

export default company;
