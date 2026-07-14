import "./ul.css";
const Ul = ({ array }, style) => {
  return (
    <ul
      className=""
      style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        ...(array[0].step
          ? {
              justifyContent: "start",
              gap: "2rem",
            }
          : {
              justifyContent: "center",
            }),
      }}
    >
      {array.map((item, index) => (
        <li key={item.id} className="ul_badge">
          {item.text && item.text}
          {item.step && (
            <p
              style={{
                color: "var(--N-text-secondary)",
              }}
            >
              {item.step}
            </p>
          )}
          {item.title && (
            <p
              style={{
                backgroundColor: "var(--N-bg-tertiary)",
                color: "var(--N-text-tertiary)",
                padding: "3px",
                borderRadius: "5px",
              }}
            >
              {item.title}
            </p>
          )}
          {item.description && <p>{item.description}</p>}
        </li>
      ))}
    </ul>
  );
};

export default Ul;
