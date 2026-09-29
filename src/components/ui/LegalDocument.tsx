import type { ReactNode } from "react";
import PageHero from "./PageHero";
import "./legalDocument.css";

interface LegalDocumentProps {
  title: string;
  updated: string;
  intro?: ReactNode;
  children: ReactNode;
}

/** Plantilla para textos legales: cabecera + columna de lectura. */
const LegalDocument = ({ title, updated, intro, children }: LegalDocumentProps) => (
  <>
    <PageHero eyebrow="Legal" title={title} description={intro} />
    <section className="section legal_section">
      <div className="container">
        <article className="legal_doc">
          <p className="legal_updated mono">Última actualización: {updated}</p>
          {children}
        </article>
      </div>
    </section>
  </>
);

/** Resalta los datos pendientes de completar (texto entre corchetes). */
export const Field = ({ value }: { value: string }) =>
  /^\[.*\]$/.test(value) ? <mark className="legal_pending">{value}</mark> : <>{value}</>;

export default LegalDocument;
