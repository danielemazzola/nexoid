import company from "../../data/company";
import Section from "../ui/Section";
import FeatureCard from "../ui/FeatureCard";
import Icon from "../ui/Icon";
import delay from "../../utils/delay";
import "./why.css";

// Barras decorativas del gráfico (valores fijos, solo estética)
const bars = Array.from({ length: 28 }, (_, i) => Math.min(100, 18 + ((i * 37) % 45) + i * 1.6));

/** Bento "¿Por qué NexoID?" con una tarjeta destacada y el resto de motivos. */
const Why = () => {
  const { why, stats } = company;
  const [first, ...rest] = why.items;
  const highlight = stats[0];

  return (
    <Section eyebrow={why.eyebrow} title={why.title} description={why.description}>
      <div className="why_grid">
        <article className="why_feature card spotlight reveal">
          <span className="icon_box">
            <Icon name={first.icon} />
          </span>
          <div>
            <strong className="why_number text-gradient">{highlight.value}</strong>
            <p>{highlight.label}</p>
          </div>
          <h3>{first.text}</h3>
          <div className="why_graph" aria-hidden="true">
            {bars.map((height, i) => (
              <span key={i} style={{ height: `${height}%` }} />
            ))}
          </div>
        </article>

        {rest.map((item, index) => (
          <FeatureCard
            key={item.id}
            icon={item.icon}
            title={item.text}
            className="why_item"
            style={delay(index * 0.06)}
          />
        ))}
      </div>
    </Section>
  );
};

export default Why;
