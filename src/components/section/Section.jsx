import "./section.css";

const Section = ({
  as: Target = "h2",
  img = null,
  title,
  badge = null,
  description,
  children,
}) => {
  return (
    <section className="section_style">
      <div className="content_banner">
        {img && <img className="banner" src={img} alt={title} />}

        <div className="overlay" />

        <div className="banner_content">
          <Target>{title}</Target>

          {badge && <p className="badge">{badge}</p>}

          {description && <p>{description}</p>}

          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;