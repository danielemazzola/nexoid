import company from "../../data/company";
import Section from "../ui/Section";
import FeatureCard from "../ui/FeatureCard";
import Tag from "../ui/Tag";
import delay from "../../utils/delay";
import "./grids.css";

/** Catálogo de soluciones de protección de identidad con su licencia mínima. */
const Solutions = () => {
  const { solutions } = company;

  return (
    <Section id="soluciones" eyebrow={solutions.eyebrow} title={solutions.title} description={solutions.description}>
      <ul className="grid grid_4">
        {solutions.items.map((item, index) => (
          <FeatureCard
            key={item.id}
            as="li"
            icon={item.icon}
            title={item.title}
            description={item.description}
            style={delay((index % 4) * 0.06)}
          >
            <Tag icon="key">{item.license}</Tag>
          </FeatureCard>
        ))}
      </ul>
      <p className="grid_note mono reveal">* {solutions.licenseNote}</p>
    </Section>
  );
};

export default Solutions;
