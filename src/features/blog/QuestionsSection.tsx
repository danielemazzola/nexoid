import { useCallback, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import blog from "../../data/blog";
import FormField from "../../components/ui/FormField";
import Icon from "../../components/ui/Icon";
import HumanCheck from "../captcha/HumanCheck";
import type { CaptchaAnswer } from "../captcha/captchaApi";
import { validateEmail } from "../contact/validation";
import { ApiError } from "../../services/http";
import { formatDate, sendQuestion, type BlogQuestion } from "./blogData";
import "../contact/contactForm.css";

type Errors = Partial<Record<"email" | "question" | "privacy" | "captcha", string>>;

/**
 * Preguntas de los lectores: las respondidas y publicadas (texto en el HTML y FAQPage para buscadores)
 * y un formulario moderado. El email nunca se muestra.
 */
const QuestionsSection = ({ slug, questions }: { slug: string; questions: BlogQuestion[] }) => {
  const q = blog.questions;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [notify, setNotify] = useState(true);
  const [privacy, setPrivacy] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [captcha, setCaptcha] = useState<CaptchaAnswer | null>(null);
  const [interacted, setInteracted] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const onCaptcha = useCallback((answer: CaptchaAnswer | null) => setCaptcha(answer), []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const found: Errors = {};
    const emailError = validateEmail(email);
    if (emailError) found.email = emailError;
    if (question.trim().length < 10) found.question = "Escribe tu pregunta (mínimo 10 caracteres)";
    if (!privacy) found.privacy = "Debes aceptar la política de privacidad";
    if (!captcha) found.captcha = "Completa la verificación de seguridad";
    setErrors(found);
    setServerError(null);
    if (Object.keys(found).length || !captcha) return;

    setStatus("sending");
    try {
      await sendQuestion(slug, { name: name.trim(), email: email.trim(), question: question.trim(), notifyAnswer: notify, privacyAccepted: privacy, website, captcha });
      setStatus("sent");
    } catch (error) {
      setStatus("idle");
      setResetKey((n) => n + 1);
      if (error instanceof ApiError && error.details) {
        setErrors(Object.fromEntries(error.details.map((d) => [d.field === "privacyAccepted" ? "privacy" : d.field, d.message])));
      }
      setServerError(error instanceof Error ? error.message : "No se pudo enviar la pregunta");
    }
  };

  return (
    <section id="preguntas" className="post_questions" data-section="Preguntas de los lectores" aria-labelledby="preguntas-title">
      <span className="eyebrow">{q.eyebrow}</span>
      <h2 id="preguntas-title">{q.title}</h2>
      <p className="post_questions_intro">{q.description}</p>

      {questions.length > 0 ? (
        <ol className="qa_list">
          {questions.map((item) => (
            <li key={item.id} className="qa_item">
              <div className="qa_question">
                <span className="qa_avatar" aria-hidden="true">
                  {(item.name ?? "?").charAt(0).toUpperCase()}
                </span>
                <div>
                  <p className="qa_meta">
                    <strong>{item.name ?? q.anonymous}</strong>
                    {item.publishedAt && <span> · {formatDate(item.publishedAt)}</span>}
                  </p>
                  <h3>{item.question}</h3>
                </div>
              </div>
              <div className="qa_answer">
                <p className="qa_meta">
                  <strong>{q.answerBy}</strong>
                </p>
                <p>{item.answer}</p>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="qa_empty">{q.empty}</p>
      )}

      {status === "sent" ? (
        <p className="qa_sent" role="status">
          <Icon name="check" size={18} /> {q.sent}
        </p>
      ) : (
        <form className="qa_form card" onSubmit={submit} onFocus={() => setInteracted(true)} noValidate>
          <div className="qa_form_grid">
            <FormField label={q.name} name="name" autoComplete="name" value={name} maxLength={80} onChange={(e) => setName(e.target.value)} placeholder={q.namePlaceholder} optional />
            <FormField
              label={q.email}
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              hint={q.emailHint}
              required
            />
          </div>
          <FormField
            as="textarea"
            label={q.question}
            name="question"
            value={question}
            maxLength={2000}
            rows={4}
            onChange={(e) => setQuestion(e.target.value)}
            error={errors.question}
            placeholder={q.questionPlaceholder}
            required
          />
          <div className="contact_hp" aria-hidden="true">
            <label htmlFor="question-website">Web</label>
            <input id="question-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
          <label className="check">
            <input type="checkbox" checked={notify} onChange={(e) => setNotify(e.target.checked)} />
            <span className="check_box" aria-hidden="true">
              <Icon name="check" size={14} strokeWidth={2.4} />
            </span>
            <span>{q.notify}</span>
          </label>
          <div className={`contact_check ${errors.privacy ? "field_error" : ""}`}>
            <label className="check">
              <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} />
              <span className="check_box" aria-hidden="true">
                <Icon name="check" size={14} strokeWidth={2.4} />
              </span>
              <span>
                {blog.privacy}{" "}
                <Link to="/privacidad" target="_blank">
                  {blog.privacyLink}
                </Link>
                .
              </span>
            </label>
            {errors.privacy && (
              <span className="field_message" role="alert">
                {errors.privacy}
              </span>
            )}
          </div>
          <HumanCheck autoStart={interacted} resetKey={resetKey} onChange={onCaptcha} error={errors.captcha} />
          {serverError && (
            <p className="contact_error" role="alert">
              {serverError}
            </p>
          )}
          <button type="submit" className="btn btn_primary qa_submit" disabled={status === "sending"}>
            <span>{status === "sending" ? q.sending : q.submit}</span>
            {status !== "sending" && <Icon name="arrow" size={18} className="btn_arrow" />}
          </button>
        </form>
      )}
    </section>
  );
};

export default QuestionsSection;
