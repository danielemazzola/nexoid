import { useState } from "react";
import pricing from "../../data/pricing";
import Section from "../../components/ui/Section";
import Button from "../../components/ui/Button";
import Icon from "../../components/ui/Icon";
import delay from "../../utils/delay";
import { contactHref, money, number, priceFor, usePlans, type Period, type PublicPlan } from "./plans";
import "./pricing.css";

const fill = (template: string, n: number) => template.replace("{n}", number(n));

/** Ahorro del anual frente a 12 mensualidades (0 si no aplica). */
const yearlySaving = (plan: PublicPlan) =>
  plan.priceMonthlyCents && plan.priceYearlyCents ? Math.max(0, plan.priceMonthlyCents * 12 - plan.priceYearlyCents) : 0;

const PlanCard = ({ plan, period, compact, index }: { plan: PublicPlan; period: Period; compact: boolean; index: number }) => {
  const price = priceFor(plan, period);
  const saving = yearlySaving(plan);
  const features = compact ? plan.features.filter((f) => f.included) : plan.features;

  return (
    <article className={`pricing_card reveal ${plan.highlighted ? "is-highlighted" : ""}`} style={delay(index * 0.06)}>
      {plan.highlighted && <span className="pricing_badge">{pricing.recommended}</span>}
      <header>
        <h3>{plan.name}</h3>
        {plan.tagline && <p className="pricing_tagline">{plan.tagline}</p>}
      </header>

      <div className="pricing_price">
        {plan.kind === "trial" ? (
          <>
            <strong>Gratis</strong>
            <span>· {plan.trialDays} días</span>
          </>
        ) : price ? (
          <>
            <strong>{money(price.cents, plan.currency)}</strong>
            <span>{price.unit}</span>
          </>
        ) : null}
        <small>
          {plan.kind === "trial"
            ? "Sin tarjeta ni compromiso"
            : price?.period === "yearly"
              ? `Equivale a ${money(Math.round(price.cents / 12), plan.currency)}/mes${saving ? ` · ahorras ${money(saving, plan.currency)}` : ""}`
              : plan.priceYearlyCents !== null
                ? `o ${money(plan.priceYearlyCents, plan.currency)}/año${saving ? ` (${pricing.yearlyHint})` : ""}`
                : " "}
        </small>
      </div>

      <p className="pricing_limits">
        <Icon name="users" size={16} />
        {plan.maxUsers ? fill(pricing.usersLimit, plan.maxUsers) : pricing.usersUnlimited} ·{" "}
        {fill(plan.maxTenants === 1 ? pricing.tenantsLimit : pricing.tenantsLimitPlural, plan.maxTenants)}
        {plan.scansPerDay !== undefined && (
          <>
            {" · "}
            {plan.scansPerDay ? fill(pricing.scansLimit, plan.scansPerDay) : pricing.scansUnlimited}
          </>
        )}
      </p>

      {plan.audience && <p className="pricing_audience">{plan.audience}</p>}

      <ul className="pricing_features">
        {features.map((f) => (
          <li key={`${f.category}-${f.label}`} className={f.included ? "" : "is-off"}>
            {f.included ? (
              <Icon name="check" size={16} strokeWidth={2.2} />
            ) : (
              <span className="pricing_off" aria-hidden="true">
                –
              </span>
            )}
            <span>
              {!f.included && <span className="sr_only_text">No incluye: </span>}
              {f.label}
              {f.detail && f.included && <small> · {f.detail}</small>}
            </span>
          </li>
        ))}
      </ul>

      <div className="pricing_action">
        <Button
          value={plan.kind === "trial" ? pricing.trialButton : pricing.planButton}
          href={contactHref(plan, price?.period ?? period)}
          variant={plan.highlighted || plan.kind === "trial" ? "primary" : "ghost"}
        />
      </div>
    </article>
  );
};

/**
 * Packs de NexoID (Demo, Básica, Estándar, VIP…), con selector mensual/anual.
 * compact: en la portada, solo lo incluido y enlace a la comparativa completa (/precios).
 */
const PricingPlans = ({ compact = false }: { compact?: boolean }) => {
  const plans = usePlans();
  const [period, setPeriod] = useState<Period>("monthly");
  const hasYearly = plans.some((p) => p.kind === "paid" && p.priceYearlyCents !== null);

  if (!plans.length) return null;

  return (
    <Section id="planes" eyebrow={pricing.eyebrow} title={pricing.title} description={pricing.description} align="center" className="pricing">
      <div className="pricing_controls reveal">
        {hasYearly && (
          <div className="pricing_toggle" role="radiogroup" aria-label="Periodo de facturación">
            {(["monthly", "yearly"] as const).map((p) => (
              <button key={p} type="button" role="radio" aria-checked={period === p} className={period === p ? "is-active" : ""} onClick={() => setPeriod(p)}>
                {p === "monthly" ? pricing.monthly : pricing.yearly}
                {p === "yearly" && <small>{pricing.yearlyHint}</small>}
              </button>
            ))}
          </div>
        )}
        {pricing.earlyAccess && (
          <p className="pricing_early">
            <Icon name="sparkle" size={16} />
            {pricing.earlyAccessNote}
          </p>
        )}
      </div>

      <div className={`pricing_grid pricing_grid_${Math.min(plans.length, 4)}`}>
        {plans.map((plan, index) => (
          <PlanCard key={plan.code} plan={plan} period={period} compact={compact} index={index} />
        ))}
      </div>

      <p className="pricing_note">{pricing.vatNote}</p>
      {compact && (
        <div className="section_footer reveal">
          <Button value={pricing.compareButton} href="/precios#comparativa" variant="ghost" />
        </div>
      )}
    </Section>
  );
};

export default PricingPlans;
