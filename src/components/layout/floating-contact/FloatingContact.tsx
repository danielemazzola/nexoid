import { lazy, Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import avatar from "../../../assets/img/avatar-dani.svg";
import { chatScript } from "../../../data/chat";
import { COOKIE_NAMES } from "../../../data/cookies";
import { useConsent } from "../../../features/consent/ConsentContext";
import "./floatingContact.css";

// El chat se descarga solo cuando alguien lo abre (no penaliza la carga de la web)
const ChatAssistant = lazy(() => import("../../../features/chat/ChatAssistant"));

const NUDGE_DELAY_MS = 25_000;
const NUDGE_KEY = COOKIE_NAMES.nudge; // se muestra como mucho una vez por sesión

/** Avatar flotante: abre el asistente de contacto. Oculto en /contacto y mientras el banner de cookies está visible. */
const FloatingContact = () => {
  const { pathname } = useLocation();
  const { pending } = useConsent();
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(false);
  const hidden = pathname === "/contacto" || pending;

  // Pequeño saludo tras un rato en la página, una sola vez por sesión
  useEffect(() => {
    if (hidden || open) return;
    let shown = false;
    try {
      shown = sessionStorage.getItem(NUDGE_KEY) === "1";
    } catch {
      /* sin sessionStorage: se muestra */
    }
    if (shown) return;
    const timer = window.setTimeout(() => {
      setNudge(true);
      try {
        sessionStorage.setItem(NUDGE_KEY, "1");
      } catch {
        /* sin sessionStorage */
      }
    }, NUDGE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [hidden, open]);

  if (hidden) return null;

  const openChat = () => {
    setNudge(false);
    setOpen(true);
  };

  if (open) {
    return (
      <Suspense fallback={null}>
        <ChatAssistant onClose={() => setOpen(false)} />
      </Suspense>
    );
  }

  return (
    <div className="floating_wrap">
      {nudge && (
        <div className="floating_nudge" role="status">
          <button type="button" className="floating_nudge_text" onClick={openChat}>
            {chatScript.nudge}
          </button>
          <button type="button" className="floating_nudge_close" onClick={() => setNudge(false)} aria-label="Cerrar mensaje">
            ×
          </button>
        </div>
      )}
      <button type="button" className="floating_contact" onClick={openChat} aria-label="Abrir chat con Daniele de NexoID" aria-haspopup="dialog">
        <span className="floating_contact_label">¿Hablamos?</span>
        <span className="floating_contact_avatar">
          <img src={avatar} alt="" width={44} height={44} loading="lazy" />
          <i />
        </span>
      </button>
    </div>
  );
};

export default FloatingContact;
