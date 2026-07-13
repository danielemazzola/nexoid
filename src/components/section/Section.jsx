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
    <section
      className="section_style"
      style={{
        ...(img && {
          backgroundImage: `url(${img})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }),
      }}
    >
      <div
        className="super_bg"
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "var(--N-spacing-l)",
          color: "#fff",
        }}
      >
        <Target>{title}</Target>

        {badge && <p>{badge}</p>}

        {description && <p>{description}</p>}

        {children}
      </div>
    </section>
  );
};

export default Section;
