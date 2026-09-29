import company from "../../data/company";
import Button from "../ui/Button";
import "./ctaBanner.css";

/** Llamada a la acción final con anillos animados. */
const CtaBanner = () => {
  const { cta } = company;

  return (
    <section className="section">
      <div className="container">
        <div className="cta_box reveal">
          <div className="cta_rings" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <span className="eyebrow">Auditoría inicial</span>
          <h2>{cta.title}</h2>
          <p>{cta.description}</p>
          <Button value={cta.button.text} href={cta.button.href} />
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
