import { useEffect, useState, type CSSProperties } from "react";
import company from "../../data/company";
import Icon from "../../components/ui/Icon";
import "./identityConsole.css";

const CYCLE_MS = 11000;
const LINE_STEP = 0.55; // segundos entre líneas

const statusLabel = { run: "RUN", ok: " OK ", warn: "WARN" } as const;

/** Consola animada que simula una auditoría de Entra ID (vista de ejemplo). */
const IdentityConsole = () => {
  const { title, label, lines, scoreLabel, scoreFrom, scoreTo } = company.console;
  const [cycle, setCycle] = useState(0);
  const [score, setScore] = useState(scoreFrom);

  // Reinicia la animación cada ciclo
  useEffect(() => {
    const id = window.setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => window.clearInterval(id);
  }, []);

  // Contador de la puntuación
  useEffect(() => {
    const delay = lines.length * LINE_STEP * 1000 + 300;
    const duration = 1600;
    let frame = 0;
    let start = 0;
    setScore(scoreFrom);

    const tick = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setScore(Math.round(scoreFrom + (scoreTo - scoreFrom) * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    const timeout = window.setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [cycle, lines.length, scoreFrom, scoreTo]);

  const barDelay = `${lines.length * LINE_STEP + 0.3}s`;

  return (
    <div className="console_wrap">
      <svg className="console_orbit" viewBox="0 0 600 600" aria-hidden="true">
        <defs>
          <radialGradient id="orbit-fade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3ad6ff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3ad6ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="300" cy="300" r="170" className="orbit_ring" />
        <circle cx="300" cy="300" r="240" className="orbit_ring orbit_ring_dashed" />
        <circle cx="300" cy="300" r="290" className="orbit_ring" />
        <g className="orbit_spin">
          <circle cx="300" cy="60" r="5" className="orbit_node" />
          <circle cx="540" cy="300" r="4" className="orbit_node" />
          <circle cx="130" cy="420" r="3.5" className="orbit_node" />
        </g>
        <g className="orbit_spin orbit_spin_reverse">
          <circle cx="300" cy="10" r="3.5" className="orbit_node" />
          <circle cx="45" cy="240" r="5" className="orbit_node" />
        </g>
        <circle cx="300" cy="300" r="150" fill="url(#orbit-fade)" opacity="0.18" />
      </svg>

      <div className="console card" key={cycle}>
        <div className="console_bar">
          <div className="console_dots">
            <span />
            <span />
            <span />
          </div>
          <span className="console_title mono">{title}</span>
          <span className="console_label mono">{label}</span>
        </div>

        <div className="console_body mono">
          <p className="console_prompt">
            <span className="console_caret">$</span> Invoke-NexoAudit -Tenant contoso.onmicrosoft.com
          </p>
          <ul>
            {lines.map((line, index) => (
              <li
                key={line.text}
                className={`console_line console_${line.status}`}
                style={{ animationDelay: `${index * LINE_STEP}s` }}
              >
                <span className="console_status">[{statusLabel[line.status]}]</span>
                {line.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="console_score">
          <div className="console_score_head">
            <span>{scoreLabel}</span>
            <strong className="mono">
              {score}
              <small>/100</small>
            </strong>
          </div>
          <div className="console_track">
            <div
              className="console_fill"
              style={
                {
                  "--from": `${scoreFrom}%`,
                  "--to": `${scoreTo}%`,
                  animationDelay: barDelay,
                } as CSSProperties
              }
            />
          </div>
        </div>
      </div>

      <div className="console_chip console_chip_1 card">
        <span className="console_chip_icon">
          <Icon name="shield" size={18} />
        </span>
        <div>
          <strong>MFA</strong>
          <span>Protegido</span>
        </div>
      </div>

      <div className="console_chip console_chip_2 card">
        <span className="console_chip_icon console_chip_icon_alt">
          <Icon name="key" size={18} />
        </span>
        <div>
          <strong>Acceso condicional</strong>
          <span>Activo</span>
        </div>
      </div>
    </div>
  );
};

export default IdentityConsole;
