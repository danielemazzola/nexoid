/** Textos del blog (los artículos se escriben en admin.nexoid.es → Blog). */
const blog = {
  eyebrow: "Blog",
  heroTitle: "Guías prácticas de seguridad en Microsoft 365",
  heroDescription:
    "Artículos claros y aplicables sobre Microsoft Entra ID, MFA, acceso condicional, privilegios y buenas prácticas, escritos por especialistas que lo implantan cada día.",
  allCategories: "Todos",
  readMore: "Leer artículo",
  minutes: (n: number) => `${n} min de lectura`,
  latest: "Último artículo",
  empty: "Pronto publicaremos los primeros artículos.",

  toc: "En este artículo",
  related: "Sigue leyendo",
  updated: "Actualizado el",
  author: {
    role: "Consultor de seguridad en Microsoft Entra ID",
    bio: "Más de 3.000 incidencias resueltas de identidad en Microsoft 365. Ayuda a pymes a proteger sus cuentas sin complicaciones.",
  },
  cta: {
    title: "¿Quieres que lo revisemos por ti?",
    text: "Analizamos tu Microsoft Entra ID con permisos de solo lectura y te damos un plan priorizado, explicado en lenguaje claro.",
    primary: { text: "Solicitar demo gratuita", href: "/contacto?plan=demo" },
    secondary: { text: "Ver planes", href: "/precios" },
  },

  questions: {
    eyebrow: "Preguntas de los lectores",
    title: "¿Tienes una duda sobre este tema?",
    description: "Pregunta y te respondemos personalmente. Publicamos las preguntas útiles para todos (solo con tu nombre, nunca tu email).",
    empty: "Aún no hay preguntas publicadas. ¡Sé el primero!",
    anonymous: "Lector anónimo",
    answerBy: "Respuesta de NexoID",
    name: "Nombre",
    namePlaceholder: "Cómo quieres aparecer",
    email: "Email",
    emailHint: "No se publica. Solo para avisarte de la respuesta.",
    question: "Tu pregunta",
    questionPlaceholder: "Por ejemplo: ¿cómo lo aplico si tengo usuarios sincronizados desde Active Directory?",
    notify: "Avísame por email cuando la respondáis",
    submit: "Enviar pregunta",
    sending: "Enviando…",
    sent: "¡Gracias! Hemos recibido tu pregunta. La revisaremos y te responderemos lo antes posible.",
  },

  subscribe: {
    title: "Recibe los nuevos artículos por email",
    description: "Un aviso cuando publiquemos algo nuevo. Sin spam y con baja en un clic.",
    placeholder: "tu@empresa.com",
    submit: "Suscribirme",
    sending: "Enviando…",
    sent: "¡Casi listo! Te hemos enviado un email: pulsa el enlace para confirmar la suscripción.",
    confirmed: "¡Suscripción confirmada! Te avisaremos de cada artículo nuevo.",
    confirmError: "El enlace de confirmación no es válido o ha caducado. Vuelve a suscribirte.",
    unsubscribeAsk: "¿Quieres dejar de recibir los avisos de artículos nuevos?",
    unsubscribeButton: "Confirmar baja",
    unsubscribed: "Te has dado de baja. No recibirás más avisos del blog.",
  },

  privacy: "He leído y acepto la",
  privacyLink: "política de privacidad",
} as const;

export default blog;
