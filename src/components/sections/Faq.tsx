import company from "../../data/company";
import Section from "../ui/Section";
import delay from "../../utils/delay";
import "./faq.css";

interface FaqItem {
  question: string;
  answer: string;
}

/** Preguntas frecuentes (acordeón nativo <details>, accesible y sin JS). Por defecto, las generales de la web. */
const Faq = ({ eyebrow, title, items }: { eyebrow?: string; title?: string; items?: readonly FaqItem[] }) => {
  const { faq } = company;
  const list = items ?? faq.items;

  return (
    <Section eyebrow={eyebrow ?? faq.eyebrow} title={title ?? faq.title} align="center">
      <div className="faq_list">
        {list.map((item, index) => (
          <details key={item.question} className="faq_item card reveal" style={delay(index * 0.05)}>
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
