import pricing from "../../data/pricing";
import Section from "../../components/ui/Section";
import Icon from "../../components/ui/Icon";
import { money, number, usePlans } from "./plans";

/** Tabla comparativa de todos los packs: precio, límites y cada característica (con su detalle). */
const PlanComparison = () => {
  const plans = usePlans();
  if (plans.length < 2) return null;

  // Filas: cada característica en el orden en que aparece por primera vez
  const rows: { category: string; label: string }[] = [];
  for (const plan of plans) {
    for (const f of plan.features) {
      if (!rows.some((r) => r.label === f.label)) rows.push({ category: f.category, label: f.label });
    }
  }

  return (
    <Section id="comparativa" title={pricing.compareTitle} className="pricing_compare">
      <div className="compare_scroll reveal" tabIndex={0} role="region" aria-label={pricing.compareTitle}>
        <table className="compare_table">
          <thead>
            <tr>
              <th scope="col">
                <span className="sr_only_text">Característica</span>
              </th>
              {plans.map((plan) => (
                <th key={plan.code} scope="col" className={plan.highlighted ? "is-highlighted" : ""}>
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Precio mensual</th>
              {plans.map((plan) => (
                <td key={plan.code} className={plan.highlighted ? "is-highlighted" : ""}>
                  {plan.kind === "trial" ? `Gratis · ${plan.trialDays} días` : plan.priceMonthlyCents !== null ? money(plan.priceMonthlyCents, plan.currency) : "—"}
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row">Precio anual</th>
              {plans.map((plan) => (
                <td key={plan.code} className={plan.highlighted ? "is-highlighted" : ""}>
                  {plan.kind === "trial" ? "—" : plan.priceYearlyCents !== null ? money(plan.priceYearlyCents, plan.currency) : "—"}
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row">Usuarios de Entra ID</th>
              {plans.map((plan) => (
                <td key={plan.code} className={plan.highlighted ? "is-highlighted" : ""}>
                  {plan.maxUsers ? `Hasta ${number(plan.maxUsers)}` : "Ilimitados"}
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row">Tenants</th>
              {plans.map((plan) => (
                <td key={plan.code} className={plan.highlighted ? "is-highlighted" : ""}>
                  {plan.maxTenants}
                </td>
              ))}
            </tr>
            {plans.some((plan) => plan.scansPerDay !== undefined) && (
              <tr>
                <th scope="row">Análisis bajo demanda</th>
                {plans.map((plan) => (
                  <td key={plan.code} className={plan.highlighted ? "is-highlighted" : ""}>
                    {plan.scansPerDay ? `${plan.scansPerDay} al día` : "Ilimitados"}
                  </td>
                ))}
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row">
                  <small>{row.category}</small>
                  {row.label}
                </th>
                {plans.map((plan) => {
                  const f = plan.features.find((x) => x.label === row.label);
                  return (
                    <td key={plan.code} className={plan.highlighted ? "is-highlighted" : ""}>
                      {f?.included ? (
                        <>
                          <Icon name="check" size={16} strokeWidth={2.2} className="compare_yes" />
                          <span className="sr_only_text">Incluido</span>
                          {f.detail && <small>{f.detail}</small>}
                        </>
                      ) : (
                        <>
                          <span className="compare_no" aria-hidden="true">
                            –
                          </span>
                          <span className="sr_only_text">No incluido</span>
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="pricing_note">{pricing.vatNote}</p>
    </Section>
  );
};

export default PlanComparison;
