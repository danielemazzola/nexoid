import company from "../../data/company";
import Section from "../ui/Section";
import delay from "../../utils/delay";
import type { RiskLevel } from "../../types/content";
import "./problems.css";

const levelLabel: Record<RiskLevel, string> = {
  risk: "Riesgo alto",
  warn: "Riesgo medio",
  info: "Gestión",
};

/** Rejilla de incidencias que resolvemos, con nivel de riesgo. */
const Problems = () => {
  const { problems } = company;

  return (
    <Section eyebrow={problems.eyebrow} title={problems.title} description={problems.description}>
      <div className="problems_legend reveal mono">
        {(Object.keys(levelLabel) as RiskLevel[]).map((level) => (
          <span key={level}>
            <i className={`dot dot_${level}`} />
            {levelLabel[level]}
          </span>
        ))}
      </div>
      <ul className="problems_grid">
        {problems.items.map((item, index) => (
          <li key={item.id} className="problem card spotlight reveal" style={delay((index % 4) * 0.05)}>
            <span className="problem_id mono">#{String(index + 1).padStart(2, "0")}</span>
            <span className="problem_text">{item.text}</span>
            <i className={`dot dot_${item.level}`} title={levelLabel[item.level]} />
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default Problems;
