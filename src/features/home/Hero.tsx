import company from "../../data/company";
import site from "../../data/site";
import Button from "../../components/ui/Button";
import delay from "../../utils/delay";
import "./hero.css";
import IdentityConsole from "./IdentityConsole";

const Hero = () => {
  const { hero } = company;

  return (
    <section className="hero" data-section="Portada">
      <div className="container hero_grid">
        <div className="hero_copy">
          <span className="hero_badge reveal">
            <i />
            {hero.badge}
          </span>

          <h1 className="reveal" style={delay(0.08)}>
            {hero.titleStart} <span className="text-gradient">{hero.titleHighlight}</span>{" "}
            {hero.titleEnd}
          </h1>

          <p className="hero_subtitle reveal" style={delay(0.16)}>
            {hero.subtitle}
          </p>

          <div className="hero_actions reveal" style={delay(0.24)}>
            <Button value={hero.primaryButton.text} href={hero.primaryButton.href} />
            <Button
              value={hero.secondaryButton.text}
              href={hero.secondaryButton.href}
              variant="ghost"
              arrow={false}
            />
          </div>
        </div>

        <div className="hero_visual reveal" style={delay(0.2)}>
          <IdentityConsole />
        </div>
      </div>

      <div className="container">
        <div className="hero_stack reveal">
          <span className="mono">Stack</span>
          <div className="hero_marquee">
            <div className="hero_marquee_track">
              {[...site.stack, ...site.stack].map((item, index) => (
                <span key={`${item}-${index}`}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
