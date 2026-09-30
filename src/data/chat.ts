/**
 * Textos del asistente de contacto (avatar flotante).
 * {nombre} se sustituye por el nombre del visitante y {tema} por el motivo elegido.
 * Cada entrada es una lista de mensajes que se envían seguidos, con efecto "escribiendo…".
 */
export const chatScript = {
  header: {
    name: "Daniele · NexoID",
    status: "En línea · respondo personalmente",
  },
  nudge: "👋 ¿Te echo una mano con Microsoft Entra ID?",

  greeting: ["¡Hola! 👋 Soy Daniele, de NexoID.", "Cuéntame en un minuto qué necesitas y te respondo yo personalmente. ¿Cómo te llamas?"],
  askCompany: ["Encantado, {nombre} 🙂", "¿Desde qué empresa me escribes?"],
  askTopic: ["Perfecto. ¿En qué te puedo ayudar?"],
  askMessage: ["{tema}, buena elección: es justo lo nuestro.", "Si quieres, cuéntame un poco más: nº de usuarios, si es cloud o híbrido, qué te preocupa…"],
  skipMessage: "Prefiero contártelo en la llamada",
  askEmail: ["Genial. ¿A qué email te escribo?"],
  askPhone: ["¿Y un teléfono? A veces es más rápido hablarlo 5 minutos."],
  review: ["Déjame comprobar que lo tengo todo bien 👇"],
  sending: "Enviando…",
  sent: [
    "¡Listo, {nombre}! 🎉",
    "Te acabo de enviar un email de confirmación. Lo reviso y te respondo personalmente, normalmente en menos de 48 horas laborables.",
    "Gracias por confiar en NexoID.",
  ],
  error: "Vaya, algo ha fallado al enviarlo: {error} ¿Lo intentamos de nuevo?",

  placeholders: {
    name: "Tu nombre",
    company: "Nombre de la empresa",
    message: "Escribe aquí…",
    email: "nombre@empresa.com",
    phone: "+34 600 000 000",
  },
} as const;
