import company from "../../data/company";
import Section from "../ui/Section";
import delay from "../../utils/delay";
import "./faq.css";

/** Preguntas frecuentes (acordeón nativo <details>, accesible y sin JS). */
const Faq = () => {
  const { faq } = company;

  return (
    <Section eyebrow={faq.eyebrow} title={faq.title} align="center">
      <div className="faq_list">
        {faq.items.map((item, index) => (
          <details key={item.id} className="faq_item card reveal" style={delay(index * 0.05)}>
            <summary>
              <h3>{item.question}</h3>
              <span className="faq_icon" aria-hidden="true" />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
};

export default Faq;
