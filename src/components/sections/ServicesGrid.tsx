import company from "../../data/company";
import Section from "../ui/Section";
import Button from "../ui/Button";
import FeatureCard from "../ui/FeatureCard";
import Icon from "../ui/Icon";
import delay from "../../utils/delay";
import "./grids.css";

/** Los tres servicios principales. */
const ServicesGrid = ({ showButton = true }: { showButton?: boolean }) => {
  const { services } = company;

  return (
    <Section id="servicios" eyebrow={services.eyebrow} title={services.title} description={services.description}>
      <div className="grid grid_3">
        {services.items.map((service, index) => (
          <FeatureCard
            key={service.id}
            icon={service.icon}
            tag={service.tag}
            title={service.title}
            description={service.description}
            style={delay(index * 0.08)}
          >
            <ul className="check_list">
              {service.points.map((point) => (
                <li key={point}>
                  <Icon name="check" size={16} strokeWidth={2} />
                  {point}
                </li>
              ))}
            </ul>
          </FeatureCard>
        ))}
      </div>
      {showButton && (
        <div className="section_footer reveal">
          <Button value={services.button.text} href={services.button.href} variant="ghost" />
        </div>
      )}
    </Section>
  );
};

export default ServicesGrid;
