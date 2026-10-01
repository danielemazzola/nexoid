/**
 * Textos de los packs (planes). Los planes, precios y características NO van aquí: se editan en
 * admin.nexoid.es → Licencias y llegan por GET /api/plans (con copia en plans.snapshot.json al compilar).
 */
const pricing = {
  /** Cabecera de /precios */
  heroDescription:
    "Todos los planes analizan tu tenant con permisos de solo lectura, te explican los riesgos en lenguaje claro y cuentan con un consultor especializado detrás.",

  eyebrow: "Planes",
  title: "Elige el nivel de protección que necesita tu empresa",
  description:
    "Empieza con una demo gratuita de 14 días: analizamos tu Microsoft Entra ID y te recomendamos el plan que mejor encaja. Sin permanencia: mensual o anual.",

  /**
   * Mientras la plataforma no esté abierta al público, los packs se muestran como acceso anticipado:
   * los botones piden la demo o el plan por el formulario (sin pago online). Poner a false al lanzar.
   */
  earlyAccess: true,
  earlyAccessNote: "Acceso anticipado: estamos incorporando las primeras empresas. Solicita tu plaza y te contactamos personalmente.",

  monthly: "Mensual",
  yearly: "Anual",
  yearlyHint: "2 meses gratis",
  vatNote: "Precios sin IVA. Licencias temporales: mensuales o anuales, sin permanencia.",
  recommended: "Recomendado",
  trialButton: "Solicitar demo gratuita",
  planButton: "Me interesa este plan",
  compareButton: "Ver comparativa completa",
  compareTitle: "Comparativa de planes",
  /** {n} = número de usuarios / tenants */
  usersLimit: "Hasta {n} usuarios",
  usersUnlimited: "Usuarios ilimitados",
  tenantsLimit: "{n} tenant",
  tenantsLimitPlural: "{n} tenants",
  scansLimit: "{n} análisis al día",
  scansUnlimited: "análisis ilimitados",

  /** Mensaje con el que se prellena el formulario al elegir un pack */
  contactMessage: (plan: string, period: string | null) =>
    period ? `Me interesa el plan ${plan} (${period}). ¿Podemos hablar?` : `Me interesa el plan ${plan}. ¿Podemos hablar?`,
  demoMessage: "Me gustaría solicitar la demo gratuita de 14 días para analizar nuestro Microsoft Entra ID.",

  faq: [
    {
      question: "¿Qué incluye la demo gratuita?",
      answer:
        "Conectamos tu tenant con permisos de solo lectura y hacemos un análisis completo con la puntuación de seguridad y las prioridades de mejora. Al terminar te recomendamos el plan que mejor encaja con tu empresa, sin compromiso.",
    },
    {
      question: "¿Hay permanencia?",
      answer: "No. Las licencias son mensuales o anuales y caducan al final del periodo si no se renuevan. El plan anual equivale a 10 mensualidades.",
    },
    {
      question: "¿Necesito licencias de Microsoft adicionales?",
      answer:
        "Algunas comprobaciones avanzadas (acceso condicional, PIM o la actividad de inicio de sesión) dependen de Microsoft Entra ID P1 o P2. Te decimos qué tienes, qué te falta y si compensa.",
    },
    {
      question: "¿Y si tengo más de 500 usuarios o varios tenants?",
      answer:
        "Preparamos una propuesta a medida, también para proveedores de IT que gestionan varios clientes. Cuéntanos tu caso desde el formulario de contacto.",
    },
    {
      question: "¿Tocáis la configuración de mi tenant?",
      answer:
        "El análisis es de solo lectura. Cualquier cambio (MFA, acceso condicional, dominios…) se hace solo con tu aprobación explícita y queda registrado.",
    },
  ],
} as const;

export default pricing;
