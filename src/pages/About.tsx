import company from "../data/company";
import PageHero from "../components/ui/PageHero";
import Stats from "../components/sections/Stats";
import Why from "../components/sections/Why";
import Sectors from "../components/sections/Sectors";
import CtaBanner from "../components/sections/CtaBanner";
import Seo from "../features/seo/Seo";
import { breadcrumbJsonLd } from "../features/seo/schema";
import seo from "../data/seo";

const About = () => {
  const { why } = company;

  return (
    <>
      <Seo {...seo.about} jsonLd={breadcrumbJsonLd("Quiénes somos", "/quienes-somos")} />
      <PageHero
        eyebrow="Quiénes somos"
        title={
          <>
            Hacemos una cosa, <span className="text-gradient">y la hacemos muy bien</span>.
          </>
        }
        description={why.description}
      />
      <Stats />
      <Why />
      <Sectors />
      <CtaBanner />
    </>
  );
};

export default About;
