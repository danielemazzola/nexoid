import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { contactTopics } from "../../data/contact";
import site from "../../data/site";
import FormField from "../../components/ui/FormField";
import Icon from "../../components/ui/Icon";
import { ApiError } from "../../services/http";
import { sendContactRequest, type ContactPayload } from "./contactApi";
import HumanCheck from "../captcha/HumanCheck";
import type { CaptchaAnswer } from "../captcha/captchaApi";
import { validateCompany, validateEmail, validateName, validatePhone } from "./validation";
import { usePlans } from "../pricing/plans";
import pricing from "../../data/pricing";
import catalog, { euros } from "../../data/serviceCatalog";
import "./contactForm.css";

type Errors = Partial<Record<keyof ContactPayload | "captcha", string>>;
type Status = "idle" | "sending" | "success" | "error";

const initialValues: ContactPayload = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  topic: "",
  message: "",
  privacyAccepted: false,
  website: "",
};

/** Validación en cliente (el backend vuelve a validar siempre). */
const validate = (values: ContactPayload): Errors => {
  const errors: Errors = {};
  const checks: [keyof ContactPayload, string | null][] = [
    ["fullName", validateName(values.fullName)],
    ["company", validateCompany(values.company)],
    ["email", validateEmail(values.email)],
    ["phone", validatePhone(values.phone)],
  ];
  for (const [field, message] of checks) if (message) errors[field] = message;
  if (!values.topic) errors.topic = "Selecciona un tema";
  if (!values.privacyAccepted) errors.privacyAccepted = "Debes aceptar la política de privacidad";
  return errors;
};

const ContactForm = () => {
  const [values, setValues] = useState<ContactPayload>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [captcha, setCaptcha] = useState<CaptchaAnswer | null>(null);
  const [interacted, setInteracted] = useState(false);
  const [captchaReset, setCaptchaReset] = useState(0);
  const onCaptcha = useCallback((answer: CaptchaAnswer | null) => setCaptcha(answer), []);

  // Llegada desde un pack (/contacto?plan=estandar&periodo=anual): tema «Planes» y mensaje prellenado.
  // Se aplica tras montar para que coincida con el HTML prerenderizado (que no tiene parámetros).
  const [params] = useSearchParams();
  const plans = usePlans();
  const chosen = plans.find((p) => p.code === params.get("plan")) ?? null;
  const chosenPeriod = params.get("periodo") === "anual" ? "anual" : params.get("periodo") === "mensual" ? "mensual" : null;
  useEffect(() => {
    if (!chosen) return;
    const message = chosen.kind === "trial" ? pricing.demoMessage : pricing.contactMessage(chosen.name, chosenPeriod);
    setValues((prev) => ({ ...prev, topic: "planes", message: prev.message || message }));
  }, [chosen, chosenPeriod]);

  // Llegada desde un servicio (/contacto?servicio=auditoria&opcion=Completa): su tema y mensaje prellenado
  const service = catalog.services.find((s) => s.id === params.get("servicio")) ?? null;
  const option = service?.options.find((o) => o.name === params.get("opcion")) ?? null;
  const optionPrice = option && "price" in option && option.price !== undefined ? `${"from" in option && option.from ? "desde " : ""}${euros(option.price)}` : null;
  const serviceLabel = service ? `${service.name}${option ? ` · ${option.name}` : ""}${optionPrice ? ` (${optionPrice} + IVA)` : ""}` : null;
  useEffect(() => {
    if (!service || !serviceLabel) return;
    setValues((prev) => ({ ...prev, topic: service.topic, message: prev.message || `Me interesa: ${serviceLabel}. ¿Podemos hablar?` }));
  }, [service, serviceLabel]);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;
    const next = type === "checkbox" ? (event.target as HTMLInputElement).checked : value;
    setValues((prev) => ({ ...prev, [name]: next }));
    if (errors[name as keyof ContactPayload]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    if (!captcha) found.captcha = "Completa la verificación de seguridad";
    setErrors(found);
    if (Object.keys(found).length || !captcha) return;

    setStatus("sending");
    try {
      await sendContactRequest({ ...values, captcha });
      setStatus("success");
      setValues(initialValues);
      setCaptchaReset((n) => n + 1);
    } catch (error) {
      setStatus("error");
      // Cada reto es de un solo uso: se genera uno nuevo para el siguiente intento
      setCaptchaReset((n) => n + 1);
      if (error instanceof ApiError && error.details) {
        setErrors(Object.fromEntries(error.details.map((detail) => [detail.field, detail.message])));
      }
      setServerMessage(error instanceof Error ? error.message : "Error inesperado");
    }
  };

  if (status === "success") {
    return (
      <div className="contact_success" role="status">
        <span className="icon_box">
          <Icon name="check" />
        </span>
        <h2>¡Solicitud recibida!</h2>
        <p>Gracias por contactar con {site.name}. Te hemos enviado un email de confirmación y te responderemos personalmente lo antes posible.</p>
        <button type="button" className="btn btn_ghost" onClick={() => setStatus("idle")}>
          Enviar otra consulta
        </button>
      </div>
    );
  }

  return (
    <form className="contact_form" onSubmit={onSubmit} onFocus={() => setInteracted(true)} noValidate>
      {chosen && (
        <p className="contact_plan" role="status">
          <Icon name="sparkle" size={16} />
          <span>
            Has elegido <strong>{chosen.name}</strong>
            {chosen.kind === "trial" ? ` · demo gratuita de ${chosen.trialDays} días` : chosenPeriod ? ` · ${chosenPeriod}` : ""}. Te respondemos personalmente.
          </span>
        </p>
      )}
      {!chosen && serviceLabel && (
        <p className="contact_plan" role="status">
          <Icon name="sparkle" size={16} />
          <span>
            Has elegido <strong>{serviceLabel}</strong>. Te respondemos personalmente con un presupuesto cerrado.
          </span>
        </p>
      )}
      <div className="contact_form_grid">
        <FormField
          label="Nombre del responsable"
          name="fullName"
          autoComplete="name"
          value={values.fullName}
          onChange={onChange}
          error={errors.fullName}
          placeholder="Nombre y apellidos"
          required
        />
        <FormField
          label="Empresa"
          name="company"
          autoComplete="organization"
          value={values.company}
          onChange={onChange}
          error={errors.company}
          placeholder="Nombre de la empresa"
          required
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={onChange}
          error={errors.email}
          placeholder="nombre@empresa.com"
          required
        />
        <FormField
          label="Teléfono"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={onChange}
          error={errors.phone}
          placeholder="+34 600 000 000"
          required
        />
      </div>

      <FormField
        as="select"
        label="Consulta relacionada con"
        name="topic"
        value={values.topic}
        onChange={onChange}
        error={errors.topic}
        required
      >
        <option value="" disabled>
          Selecciona un servicio
        </option>
        {contactTopics.map((topic) => (
          <option key={topic.id} value={topic.id}>
            {topic.label}
          </option>
        ))}
      </FormField>

      <FormField
        as="textarea"
        label="Cuéntanos brevemente"
        name="message"
        optional
        value={values.message}
        onChange={onChange}
        error={errors.message}
        placeholder="Nº de usuarios, si el entorno es cloud o híbrido, qué te preocupa…"
        maxLength={2000}
      />

      {/* Honeypot: oculto para personas, los bots suelen rellenarlo */}
      <div className="contact_hp" aria-hidden="true">
        <label htmlFor="website">Web</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
      </div>

      <div className={`contact_check ${errors.privacyAccepted ? "field_error" : ""}`}>
        <label className="check">
          <input type="checkbox" name="privacyAccepted" checked={values.privacyAccepted} onChange={onChange} />
          <span className="check_box" aria-hidden="true">
            <Icon name="check" size={14} strokeWidth={2.4} />
          </span>
          <span>
            He leído y acepto la{" "}
            <Link to="/privacidad" target="_blank">
              política de privacidad
            </Link>
            .
          </span>
        </label>
        {errors.privacyAccepted && (
          <span className="field_message" role="alert">
            {errors.privacyAccepted}
          </span>
        )}
      </div>

      <HumanCheck autoStart={interacted} resetKey={captchaReset} onChange={onCaptcha} error={errors.captcha} />

      <p className="contact_legal">
        Responsable: {site.name}. Finalidad: atender tu consulta y, si lo pides, preparar una propuesta. Legitimación:
        tu consentimiento y medidas precontractuales. No se cederán datos a terceros salvo obligación legal. Puedes
        ejercer tus derechos como se indica en la{" "}
        <Link to="/privacidad" target="_blank">
          política de privacidad
        </Link>
        .
      </p>

      {status === "error" && serverMessage && (
        <p className="contact_error" role="alert">
          {serverMessage}
        </p>
      )}

      <button type="submit" className="btn btn_primary contact_submit" disabled={status === "sending"}>
        <span>{status === "sending" ? "Enviando…" : "Enviar solicitud"}</span>
        {status !== "sending" && <Icon name="arrow" size={18} className="btn_arrow" />}
      </button>
    </form>
  );
};

export default ContactForm;
