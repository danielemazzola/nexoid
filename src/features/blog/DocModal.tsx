import { useEffect, useRef } from "react";
import Icon from "../../components/ui/Icon";

export interface OfficialDoc {
  title: string;
  summary: string;
  url: string;
}

/**
 * Modal con la referencia a la documentación oficial de Microsoft Learn: resumen propio + botón para abrirla.
 * Microsoft no permite mostrar su documentación dentro de otras webs (X-Frame-Options / frame-ancestors),
 * así que el artículo oficial se abre en una pestaña nueva.
 */
const DocModal = ({ doc, onClose }: { doc: OfficialDoc; onClose: () => void }) => {
  const dialog = useRef<HTMLDivElement>(null);
  const openButton = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    openButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      // Foco atrapado dentro del modal
      if (event.key === "Tab" && dialog.current) {
        const focusable = dialog.current.querySelectorAll<HTMLElement>("a[href], button");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [onClose]);

  const path = doc.url.replace(/^https:\/\/learn\.microsoft\.com\/[a-z]{2}-[a-z]{2}\//i, "").split("/").slice(0, -1).join(" › ");

  return (
    <div className="doc_backdrop" onClick={onClose}>
      <div ref={dialog} className="doc_modal" role="dialog" aria-modal="true" aria-labelledby="doc-title" onClick={(e) => e.stopPropagation()}>
        <header className="doc_head">
          <span className="doc_source">
            <svg viewBox="0 0 23 23" width="18" height="18" aria-hidden="true">
              <path fill="#f35325" d="M1 1h10v10H1z" />
              <path fill="#81bc06" d="M12 1h10v10H12z" />
              <path fill="#05a6f0" d="M1 12h10v10H1z" />
              <path fill="#ffba08" d="M12 12h10v10H12z" />
            </svg>
            Documentación oficial · Microsoft Learn
          </span>
          <button type="button" className="doc_close" onClick={onClose} aria-label="Cerrar">
            ×
          </button>
        </header>

        <h2 id="doc-title">{doc.title}</h2>
        {path && <p className="doc_path">{path}</p>}

        <div className="doc_summary">
          <p className="doc_label">Qué dice Microsoft</p>
          <p>{doc.summary}</p>
        </div>

        <div className="doc_actions">
          <a
            ref={openButton}
            className="btn btn_primary"
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => {
              // Siempre en una pestaña nueva (algunos navegadores integrados ignoran target="_blank"): nexoid.es no se cierra
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
              const opened = window.open(doc.url, "_blank");
              if (opened) {
                opened.opener = null; // la pestaña de Microsoft no puede controlar nexoid.es
                event.preventDefault();
              }
              // Si el navegador bloquea la ventana, sigue el enlace normal (target="_blank")
              onClose();
            }}
          >
            <span>Leer en Microsoft Learn</span>
            <Icon name="arrow" size={18} className="btn_arrow" />
          </a>
          <button type="button" className="btn btn_ghost" onClick={onClose}>
            <span>Seguir leyendo</span>
          </button>
        </div>
        <p className="doc_note">Se abre en una pestaña nueva: Microsoft no permite mostrar su documentación dentro de otras webs. Resumen elaborado por NexoID.</p>
      </div>
    </div>
  );
};

export default DocModal;
