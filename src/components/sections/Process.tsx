import company from "../../data/company";
import Section from "../ui/Section";
import Icon from "../ui/Icon";
import delay from "../../utils/delay";
import "./process.css";

/** Línea de tiempo con los 4 pasos de trabajo. */
const Process = () => {
  const { process } = company;

  return (
    <Section eyebrow={process.eyebrow} title={process.title} align="center">
      <ol className="process_grid">
        {process.items.map((step, index) => (
          <li key={step.id} className="process_step reveal" style={delay(index * 0.1)}>
            <div className="process_node">
              <Icon name={step.icon} />
            </div>
            <span className="process_num mono">{step.step}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
};

export default Process;
