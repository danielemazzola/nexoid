import { useCallback, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import blog from "../../data/blog";
import Icon from "../../components/ui/Icon";
import HumanCheck from "../captcha/HumanCheck";
import type { CaptchaAnswer } from "../captcha/captchaApi";
import { validateEmail } from "../contact/validation";
import { ApiError } from "../../services/http";
import { subscribeToBlog } from "./blogData";
import "../contact/contactForm.css";

/** Suscripción a los avisos de artículos nuevos (doble confirmación por email). */
const SubscribeBox = ({ compact = false }: { compact?: boolean }) => {
  const [email, setEmail] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [captcha, setCaptcha] = useState<CaptchaAnswer | null>(null);
  const [interacted, setInteracted] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const onCaptcha = useCallback((answer: CaptchaAnswer | null) => setCaptcha(answer), []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const invalid = validateEmail(email) ?? (!privacy ? "Debes aceptar la política de privacidad" : !captcha ? "Espera a que termine la verificación de seguridad" : null);
    setError(invalid);
    if (invalid || !captcha) return;
    setStatus("sending");
    try {
      await subscribeToBlog({ email: email.trim(), privacyAccepted: privacy, website, captcha });
      setStatus("sent");
    } catch (err) {
      setStatus("idle");
      setResetKey((n) => n + 1); // cada reto es de un solo uso
      setError(err instanceof ApiError ? (err.details?.[0]?.message ?? err.message) : "No se pudo completar la suscripción");
    }
  };

  return (
    <section className={`subscribe card ${compact ? "subscribe_compact" : ""}`} data-section="Suscripción al blog" aria-labelledby="subscribe-title">
      <span className="icon_box" aria-hidden="true">
        <Icon name="mail" />
      </span>
      <div className="subscribe_text">
        <h2 id="subscribe-title">{blog.subscribe.title}</h2>
        <p>{blog.subscribe.description}</p>
      </div>

      {status === "sent" ? (
        <p className="subscribe_done" role="status">
          <Icon name="check" size={18} /> {blog.subscribe.sent}
        </p>
      ) : (
        <form className="subscribe_form" onSubmit={submit} onFocus={() => setInteracted(true)} noValidate>
          <div className="subscribe_row">
            <label className="sr_only_text" htmlFor="subscribe-email">
              Email
            </label>
            <input
              id="subscribe-email"
              className="field_control"
              type="email"
              autoComplete="email"
              placeholder={blog.subscribe.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "subscribe-error" : undefined}
            />
            <button type="submit" className="btn btn_primary" disabled={status === "sending"}>
              <span>{status === "sending" ? blog.subscribe.sending : blog.subscribe.submit}</span>
            </button>
          </div>
          <div className="contact_hp" aria-hidden="true">
            <label htmlFor="subscribe-website">Web</label>
            <input id="subscribe-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
          <label className="check subscribe_privacy">
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
          <HumanCheck autoStart={interacted} resetKey={resetKey} onChange={onCaptcha} />
          {error && (
            <p id="subscribe-error" className="subscribe_error" role="alert">
              {error}
            </p>
          )}
        </form>
      )}
    </section>
  );
};

export default SubscribeBox;
