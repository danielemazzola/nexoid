import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { categories, type CookieCategory } from "../../data/cookies";
import Icon from "../../components/ui/Icon";
import { useConsent } from "./ConsentContext";
import "./cookieBanner.css";

/**
 * Banner de cookies conforme a la Guía de cookies de la AEPD (2023):
 * - "Aceptar" y "Rechazar" en la primera capa, con el mismo peso visual.
 * - Nada preseleccionado; las cookies no necesarias solo se activan tras aceptar.
 * - Segunda capa con configuración por finalidad.
 * - Se puede reabrir en cualquier momento desde el pie ("Configurar cookies").
 */
const CookieBanner = () => {
  const { consent, pending, preferencesOpen, acceptAll, rejectAll, save, openPreferences, closePreferences } =
    useConsent();

  const [choices, setChoices] = useState<Record<CookieCategory, boolean>>({
    necessary: true,
    analytics: consent?.analytics ?? false,
  });

  const dialogRef = useRef<HTMLDivElement>(null);

  // Al abrir el panel, sincroniza con la decisión guardada y mueve el foco
  useEffect(() => {
    if (!preferencesOpen) return;
    setChoices({ necessary: true, analytics: consent?.analytics ?? false });
    dialogRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !pending) closePreferences();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [preferencesOpen, consent, pending, closePreferences]);

  if (preferencesOpen) {
    return (
      <div className="cookie_overlay" role="presentation">
        <div
          ref={dialogRef}
          className="cookie_modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
          tabIndex={-1}
        >
          <div className="cookie_modal_head">
            <h2 id="cookie-modal-title">Configurar cookies</h2>
            {!pending && (
              <button type="button" className="cookie_close" onClick={closePreferences} aria-label="Cerrar">
                ×
              </button>
            )}
          </div>
          <p className="cookie_text">
            Elige qué cookies permites. Puedes cambiar de opinión en cualquier momento desde el enlace
            «Configurar cookies» del pie de página. Más información en la{" "}
            <Link to="/cookies" onClick={closePreferences}>
              Política de cookies
            </Link>
            .
          </p>

          <ul className="cookie_categories">
            {categories.map((category) => (
              <li key={category.id} className="cookie_category">
                <div className="cookie_category_head">
                  <strong>{category.title}</strong>
                  {category.required ? (
                    <span className="cookie_always mono">Siempre activas</span>
                  ) : (
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={choices[category.id]}
                        onChange={(event) =>
                          setChoices((prev) => ({ ...prev, [category.id]: event.target.checked }))
                        }
                      />
                      <span className="switch_track" aria-hidden="true" />
                      <span className="sr_only">Activar cookies {category.title.toLowerCase()}</span>
                    </label>
                  )}
                </div>
                <p>{category.description}</p>
              </li>
            ))}
          </ul>

          <div className="cookie_actions">
            <button type="button" className="cookie_btn" onClick={rejectAll}>
              Rechazar todas
            </button>
            <button type="button" className="cookie_btn" onClick={() => save({ analytics: choices.analytics })}>
              Guardar selección
            </button>
            <button type="button" className="cookie_btn" onClick={acceptAll}>
              Aceptar todas
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!pending) return null;

  return (
    <div className="cookie_banner" role="region" aria-label="Aviso de cookies">
      <div className="cookie_banner_icon">
        <Icon name="shield" />
      </div>
      <div className="cookie_banner_body">
        <strong>Tu privacidad, bajo control</strong>
        <p className="cookie_text">
          Usamos cookies propias técnicas para que la web funcione y, solo si lo aceptas, cookies propias
          analíticas para medir el uso de la web. No usamos cookies publicitarias ni de terceros.{" "}
          <Link to="/cookies">Más información</Link>.
        </p>
      </div>
      <div className="cookie_actions">
        <button type="button" className="cookie_btn" onClick={rejectAll}>
          Rechazar
        </button>
        <button type="button" className="cookie_btn cookie_btn_link" onClick={openPreferences}>
          Configurar
        </button>
        <button type="button" className="cookie_btn" onClick={acceptAll}>
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
