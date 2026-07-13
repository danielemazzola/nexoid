import { Link } from "react-router-dom";
import company from "../data/company.js";
import Ul from "../components/list/Ul.jsx";
import Button from "../components/button/Button.jsx";
import Section from "../components/section/Section.jsx";

const Home = () => {
  const { hero, target, problems, services, why, process, cta } = company;

  return (
    <>
      <Section
        as="h1"
        img={hero.img}
        title={hero.title}
        badge={hero.badge}
        description={hero.description}
      >
        <Button
          value={hero.secondaryButton.text}
          href={hero.secondaryButton.href}
        />
      </Section>

      <Section
        as="h2"
        img={problems.img}
        title={problems.title}
        description={problems.description}
      >
        <Ul array={problems.items} />
      </Section>

      <Section
        as="h2"
        img={target.img}
        title={target.title}
        description={target.description}
      >
        <Ul array={target.items} />
      </Section>

      <Section
        as="h2"
        img={services.img}
        title={services.title}
        description={services.description}
      >
        <Button value={services.button.text} href={services.button.href} />
      </Section>

      <Section
        as="h2"
        img={why.img}
        title={why.title}
        description={why.description}
      >
        <Ul array={why.items} />
      </Section>

      <Section as="h2" img={process.img} title={process.title}>
        {/* {process.items.map((item) => (
          <div key={item.id}>
            <div>{item.step}</div>
            <div>{item.title}</div>
            <div>{item.description}</div>
          </div> 
        ))}
        */}
        <Ul array={process.items} />
      </Section>

      <Section as="h2" title={cta.title} description={cta.description}>
        <Button value={cta.button.text} href={cta.button.href} />
      </Section>
    </>
  );
};

export default Home;
