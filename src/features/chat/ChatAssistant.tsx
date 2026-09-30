import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import avatar from "../../assets/img/avatar-dani.svg";
import { chatScript } from "../../data/chat";
import { contactTopics, type ContactTopicId } from "../../data/contact";
import { COOKIE_NAMES } from "../../data/cookies";
import { ApiError } from "../../services/http";
import { fetchChallenge, solveChallenge, type CaptchaAnswer } from "../captcha/captchaApi";
import { sendContactRequest } from "../contact/contactApi";
import { firstName, validateCompany, validateEmail, validateName, validatePhone } from "../contact/validation";
import "./chatAssistant.css";

/**
 * Asistente de contacto con forma de chat: pregunta de una en una (nombre, empresa, motivo, mensaje,
 * email y teléfono), verifica en segundo plano que es una persona (NexoCaptcha) y crea el lead igual
 * que el formulario de /contacto. Lo escrito se guarda en sessionStorage para no perderlo al navegar.
 */

type Field = "fullName" | "company" | "topic" | "message" | "email" | "phone";
type Step = Field | "review" | "sending" | "sent";

interface Answers {
  fullName: string;
  company: string;
  topic: ContactTopicId | "";
  message: string;
  email: string;
  phone: string;
}

interface ChatMessage {
  id: number;
  from: "bot" | "user";
  text: string;
}

interface SavedChat {
  answers: Answers;
  messages: ChatMessage[];
  step: Step;
}

const EMPTY: Answers = { fullName: "", company: "", topic: "", message: "", email: "", phone: "" };
const ORDER: Field[] = ["fullName", "company", "topic", "message", "email", "phone"];
const CAPTCHA_MAX_AGE = 9 * 60_000; // el reto caduca a los 10 min
const REDUCED_MOTION = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const topicLabel = (id: string) => contactTopics.find((t) => t.id === id)?.label ?? id;

const fill = (text: string, answers: Answers) =>
  text.replaceAll("{nombre}", firstName(answers.fullName)).replaceAll("{tema}", topicLabel(answers.topic));

/** Tiempo "escribiendo…" proporcional a la longitud del mensaje. */
const typingDelay = (text: string) => (REDUCED_MOTION ? 120 : Math.min(1600, 380 + text.length * 16));

const loadChat = (): SavedChat | null => {
  try {
    const raw = sessionStorage.getItem(COOKIE_NAMES.chat);
    return raw ? (JSON.parse(raw) as SavedChat) : null;
  } catch {
    return null;
  }
};

const saveChat = (chat: SavedChat | null) => {
  try {
    if (chat) sessionStorage.setItem(COOKIE_NAMES.chat, JSON.stringify(chat));
    else sessionStorage.removeItem(COOKIE_NAMES.chat);
  } catch {
    /* sessionStorage no disponible */
  }
};

const ChatAssistant = ({ onClose }: { onClose: () => void }) => {
  // Conversación guardada en esta pestaña (se lee una sola vez al abrir)
  const [saved] = useState(loadChat);
  const [answers, setAnswers] = useState<Answers>(saved?.answers ?? EMPTY);
  const [messages, setMessages] = useState<ChatMessage[]>(saved?.messages ?? []);
  const [step, setStep] = useState<Step | null>(saved?.step ?? null);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false); // volviendo desde el resumen a corregir un dato
  const [privacy, setPrivacy] = useState(false);
  const [busy, setBusy] = useState(false); // respuesta enviada, esperando la siguiente pregunta
  const [captchaState, setCaptchaState] = useState<"working" | "ready" | "error">("working");

  const captcha = useRef<{ answer: CaptchaAnswer; at: number } | null>(null);
  const nextId = useRef(Math.max(0, ...(saved?.messages ?? []).map((m) => m.id)) + 1);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const alive = useRef(true);

  // ---------- Verificación anti-bots en segundo plano ----------
  const solveCaptcha = useCallback(async () => {
    setCaptchaState("working");
    try {
      const answer = await solveChallenge(await fetchChallenge(), () => undefined);
      captcha.current = { answer, at: Date.now() };
      if (alive.current) setCaptchaState("ready");
      return answer;
    } catch {
      if (alive.current) setCaptchaState("error");
      return null;
    }
  }, []);

  useEffect(() => {
    alive.current = true;
    solveCaptcha();
    return () => {
      alive.current = false;
    };
  }, [solveCaptcha]);

  // ---------- Mensajes con efecto "escribiendo…" ----------
  const push = useCallback((from: ChatMessage["from"], text: string) => {
    setMessages((list) => [...list, { id: nextId.current++, from, text }]);
  }, []);

  const botSay = useCallback(
    async (texts: readonly string[], current: Answers, cancelled: () => boolean = () => false) => {
      for (const text of texts) {
        const line = fill(text, current);
        setTyping(true);
        await new Promise((resolve) => setTimeout(resolve, typingDelay(line)));
        if (!alive.current || cancelled()) return;
        setTyping(false);
        push("bot", line);
      }
    },
    [push],
  );

  // Saludo inicial (solo si es una conversación nueva)
  useEffect(() => {
    if (step !== null) return;
    // Cancelable: si el efecto se repite (StrictMode, reabrir rápido) el saludo no se duplica
    let cancelled = false;
    botSay(chatScript.greeting, EMPTY, () => cancelled).then(() => {
      if (!cancelled && alive.current) setStep("fullName");
    });
    return () => {
      cancelled = true;
    };
  }, [step, botSay]);

  // Guardar el progreso para no perderlo al navegar (se borra al enviar)
  useEffect(() => {
    if (step === "sent") saveChat(null);
    else if (step) saveChat({ answers, messages, step: step === "sending" ? "review" : step });
  }, [answers, messages, step]);

  // Scroll al último mensaje y foco en el campo
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: REDUCED_MOTION ? "auto" : "smooth" });
  }, [messages, typing, step]);
  useEffect(() => {
    if (!typing) inputRef.current?.focus();
  }, [typing, step]);

  // Escape cierra
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // ---------- Avanzar en la conversación ----------
  const askNext = async (field: Field, current: Answers) => {
    if (editing) {
      setEditing(false);
      await botSay(["Hecho, lo he cambiado ✔"], current);
      setStep("review");
      return;
    }
    const next = ORDER[ORDER.indexOf(field) + 1];
    const script: Record<Field, readonly string[]> = {
      fullName: chatScript.greeting,
      company: chatScript.askCompany,
      topic: chatScript.askTopic,
      message: chatScript.askMessage,
      email: chatScript.askEmail,
      phone: chatScript.askPhone,
    };
    if (next) {
      await botSay(script[next], current);
      setStep(next);
    } else {
      await botSay(chatScript.review, current);
      setStep("review");
    }
  };

  const answer = async (field: Field, value: string, shown = value) => {
    const current = { ...answers, [field]: value };
    setAnswers(current);
    setInput("");
    setInputError(null);
    setBusy(true);
    if (shown) push("user", shown);
    await askNext(field, current);
    setBusy(false);
  };

  const validators: Partial<Record<Field, (value: string) => string | null>> = {
    fullName: validateName,
    company: validateCompany,
    email: validateEmail,
    phone: validatePhone,
  };

  const submitText = (event: FormEvent) => {
    event.preventDefault();
    if (busy || !step || !ORDER.includes(step as Field)) return;
    const field = step as Field;
    const value = input.trim();
    if (field === "message") {
      if (value) answer("message", value);
      return;
    }
    const error = validators[field]?.(value);
    if (error) {
      setInputError(error);
      return;
    }
    answer(field, value);
  };

  const edit = (field: Field) => {
    setEditing(true);
    setInput(field === "topic" ? "" : answers[field]);
    setStep(field);
  };

  // ---------- Envío ----------
  const send = async () => {
    setStep("sending");
    let proof = captcha.current && Date.now() - captcha.current.at < CAPTCHA_MAX_AGE ? captcha.current.answer : null;
    proof ??= await solveCaptcha();
    if (!proof) {
      setStep("review");
      push("bot", "No he podido verificar que eres una persona. Revisa tu conexión y vuelve a intentarlo.");
      return;
    }
    try {
      captcha.current = null; // cada reto es de un solo uso
      await sendContactRequest({
        fullName: answers.fullName,
        company: answers.company,
        email: answers.email,
        phone: answers.phone,
        topic: answers.topic,
        message: answers.message,
        privacyAccepted: privacy,
        website: "", // honeypot
        captcha: proof,
      });
      setStep("sent");
      await botSay(chatScript.sent, answers);
    } catch (error) {
      solveCaptcha(); // nuevo reto para el siguiente intento
      const message = error instanceof ApiError ? error.message : "Error inesperado";
      // Si la API señala un campo concreto, se vuelve a preguntar ese
      const field = error instanceof ApiError ? (error.details?.[0]?.field as Field | undefined) : undefined;
      await botSay([chatScript.error.replace("{error}", message)], answers);
      if (field && ORDER.includes(field)) edit(field);
      else setStep("review");
    }
  };

  // ---------- Vista ----------
  const reviewRows: [Field, string, string][] = [
    ["fullName", "Nombre", answers.fullName],
    ["company", "Empresa", answers.company],
    ["topic", "Motivo", answers.topic ? topicLabel(answers.topic) : ""],
    ["message", "Detalles", answers.message || "—"],
    ["email", "Email", answers.email],
    ["phone", "Teléfono", answers.phone],
  ];

  return (
    <div className="chat" role="dialog" aria-modal="false" aria-labelledby="chat-title">
      <header className="chat_head">
        <span className="chat_head_avatar">
          <img src={avatar} alt="" width={40} height={40} />
          <i aria-hidden="true" />
        </span>
        <div className="chat_head_text">
          <strong id="chat-title">{chatScript.header.name}</strong>
          <span>{chatScript.header.status}</span>
        </div>
        <button type="button" className="chat_close" onClick={onClose} aria-label="Cerrar el chat">
          ×
        </button>
      </header>

      <div className="chat_body" ref={listRef} aria-live="polite">
        {messages.map((m) => (
          <p key={m.id} className={`chat_msg chat_msg_${m.from}`}>
            {m.text}
          </p>
        ))}
        {typing && (
          <p className="chat_msg chat_msg_bot chat_typing" aria-label="Daniele está escribiendo">
            <span />
            <span />
            <span />
          </p>
        )}

        {(step === "review" || step === "sending") && (
          <div className="chat_review">
            <dl>
              {reviewRows.map(([field, label, value]) => (
                <div key={field}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                  <button type="button" onClick={() => edit(field)} disabled={step === "sending"} aria-label={`Cambiar ${label.toLowerCase()}`}>
                    Cambiar
                  </button>
                </div>
              ))}
            </dl>
            <label className="chat_privacy">
              <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} />
              <span>
                Acepto la{" "}
                <Link to="/privacidad" target="_blank">
                  política de privacidad
                </Link>
                . Solo usaremos tus datos para responder a tu consulta.
              </span>
            </label>
            <p className={`chat_captcha chat_captcha_${captchaState}`}>
              {captchaState === "ready" && "🔒 Verificado: eres una persona"}
              {captchaState === "working" && "🔒 Verificando que eres una persona…"}
              {captchaState === "error" && (
                <>
                  ⚠ No se pudo verificar.{" "}
                  <button type="button" onClick={() => solveCaptcha()}>
                    Reintentar
                  </button>
                </>
              )}
            </p>
            <button type="button" className="chat_send" onClick={send} disabled={!privacy || step === "sending"}>
              {step === "sending" ? chatScript.sending : "Enviar a Daniele"}
            </button>
          </div>
        )}
      </div>

      {/* Zona de respuesta según el paso */}
      {step === "topic" && !typing && !busy && (
        <div className="chat_options" role="group" aria-label="Motivo de contacto">
          {contactTopics.map((t) => (
            <button key={t.id} type="button" onClick={() => answer("topic", t.id, t.label)}>
              {t.label}
            </button>
          ))}
        </div>
      )}

      {step && ["fullName", "company", "message", "email", "phone"].includes(step) && !typing && !busy && (
        <form className="chat_input" onSubmit={submitText} noValidate>
          {step === "message" ? (
            <textarea
              ref={inputRef}
              rows={2}
              value={input}
              maxLength={2000}
              placeholder={chatScript.placeholders.message}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  e.currentTarget.form?.requestSubmit();
                }
              }}
              aria-label="Detalles de tu consulta"
            />
          ) : (
            <input
              ref={inputRef}
              type={step === "email" ? "email" : step === "phone" ? "tel" : "text"}
              autoComplete={{ fullName: "name", company: "organization", email: "email", phone: "tel" }[step as string] ?? "off"}
              value={input}
              maxLength={step === "company" ? 160 : 120}
              placeholder={chatScript.placeholders[step === "fullName" ? "name" : (step as "company" | "email" | "phone")]}
              onChange={(e) => {
                setInput(e.target.value);
                setInputError(null);
              }}
              aria-invalid={Boolean(inputError)}
              aria-describedby={inputError ? "chat-input-error" : undefined}
              aria-label={chatScript.placeholders[step === "fullName" ? "name" : (step as "company" | "email" | "phone")]}
            />
          )}
          <button type="submit" aria-label="Enviar respuesta">
            ➤
          </button>
          {step === "message" && !editing && (
            <button type="button" className="chat_skip" onClick={() => answer("message", "", chatScript.skipMessage)}>
              {chatScript.skipMessage}
            </button>
          )}
          {inputError && (
            <span id="chat-input-error" className="chat_input_error" role="alert">
              {inputError}
            </span>
          )}
        </form>
      )}

      {step === "sent" && (
        <div className="chat_done">
          <button type="button" onClick={onClose}>
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
