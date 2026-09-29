import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "../../components/ui/Icon";
import { fetchChallenge, solveChallenge, type CaptchaAnswer } from "./captchaApi";
import "./humanCheck.css";

type Status = "idle" | "working" | "verified" | "error";

interface HumanCheckProps {
  /** Arranca la verificación automáticamente (p. ej. al empezar a rellenar el formulario) */
  autoStart?: boolean;
  /** Cambia este valor para forzar una verificación nueva (tras un envío) */
  resetKey?: number;
  onChange: (answer: CaptchaAnswer | null) => void;
  error?: string;
}

/**
 * NexoCaptcha: verificación anti-bots propia, sin terceros ni cookies.
 * El navegador resuelve un reto criptográfico que el servidor firma y comprueba.
 */
const HumanCheck = ({ autoStart = false, resetKey = 0, onChange, error }: HumanCheckProps) => {
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const running = useRef(false);

  const start = useCallback(async () => {
    if (running.current) return;
    running.current = true;
    setStatus("working");
    setProgress(0);
    onChange(null);
    try {
      const challenge = await fetchChallenge();
      const answer = await solveChallenge(challenge, setProgress);
      setProgress(1);
      setStatus("verified");
      onChange(answer);
    } catch {
      setStatus("error");
    } finally {
      running.current = false;
    }
  }, [onChange]);

  // Reinicio tras un envío (cada reto es de un solo uso)
  useEffect(() => {
    if (resetKey === 0) return;
    setStatus("idle");
    onChange(null);
  }, [resetKey, onChange]);

  useEffect(() => {
    if (autoStart && status === "idle") start();
  }, [autoStart, status, start]);

  const label = {
    idle: "Verificar que no soy un robot",
    working: "Verificando…",
    verified: "Verificado: eres una persona",
    error: "No se pudo verificar. Reintentar",
  }[status];

  return (
    <div className={`human_check human_check_${status} ${error ? "human_check_invalid" : ""}`}>
      <button
        type="button"
        className="human_check_box"
        onClick={start}
        disabled={status === "working" || status === "verified"}
        aria-live="polite"
      >
        <span className="human_check_indicator" aria-hidden="true">
          {status === "verified" ? (
            <Icon name="check" size={16} strokeWidth={2.6} />
          ) : status === "working" ? (
            <span className="human_check_spinner" />
          ) : null}
        </span>
        <span className="human_check_label">{label}</span>
      </button>

      <div className="human_check_brand mono" aria-hidden="true">
        <Icon name="shield" size={14} />
        NexoCaptcha
      </div>

      <div className="human_check_bar" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>

      {error && status !== "verified" && (
        <span className="field_message" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default HumanCheck;
