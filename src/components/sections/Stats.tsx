import company from "../../data/company";
import delay from "../../utils/delay";
import "./stats.css";

/** Banda de cifras clave. */
const Stats = () => (
  <section className="stats" data-section="Cifras">
    <div className="container">
      <div className="stats_grid">
        {company.stats.map((stat, index) => (
          <div key={stat.id} className="stat reveal" style={delay(index * 0.06)}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
