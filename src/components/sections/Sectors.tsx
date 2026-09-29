import company from "../../data/company";
import Section from "../ui/Section";
import FeatureCard from "../ui/FeatureCard";
import delay from "../../utils/delay";
import "./grids.css";

/** Sectores a los que ayudamos. */
const Sectors = () => {
  const { target } = company;

  return (
    <Section eyebrow={target.eyebrow} title={target.title} description={target.description}>
      <ul className="grid grid_3 grid_tight">
        {target.items.map((item, index) => (
          <FeatureCard
            key={item.id}
            as="li"
            layout="row"
            icon={item.icon}
            title={item.text}
            style={delay((index % 3) * 0.06)}
          />
        ))}
      </ul>
    </Section>
  );
};

export default Sectors;
