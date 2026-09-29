import { Link, useLocation } from "react-router-dom";
import avatar from "../../../assets/img/dani-avatar.png";
import { useConsent } from "../../../features/consent/ConsentContext";
import "./floatingContact.css";

/** Botón flotante de contacto con avatar (se oculta en la página de contacto). */
const FloatingContact = () => {
  const { pathname } = useLocation();
  const { pending } = useConsent();
  // Oculto en /contacto y mientras el banner de cookies está visible (no se solapan)
  if (pathname === "/contacto" || pending) return null;

  return (
    <Link to="/contacto" className="floating_contact" aria-label="Habla con nosotros">
      <span className="floating_contact_label">¿Hablamos?</span>
      <span className="floating_contact_avatar">
        <img src={avatar} alt="" width={44} height={44} loading="lazy" />
        <i />
      </span>
    </Link>
  );
};

export default FloatingContact;
