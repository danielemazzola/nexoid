import { Link } from "react-router-dom";
import { categories, cookies, CONSENT_VERSION } from "../../data/cookies";
import site from "../../data/site";
import LegalDocument from "../../components/ui/LegalDocument";
import Seo from "../../features/seo/Seo";
import { useConsent } from "../../features/consent/ConsentContext";

/** Política de cookies generada a partir del inventario real (data/cookies.ts). */
const CookiesPolicy = () => {
  const { openPreferences, consent } = useConsent();

  return (
    <LegalDocument
      title="Política de cookies"
      updated={CONSENT_VERSION}
      intro="Qué cookies usamos, para qué y cómo puedes gestionarlas en cualquier momento."
    >
      <Seo
        title="Política de cookies"
        description={`Información sobre las cookies propias que utiliza ${site.name} y cómo configurarlas o retirar tu consentimiento.`}
      />

      <h2>¿Qué son las cookies?</h2>
      <p>
        Son pequeños archivos que una web guarda en tu navegador para recordar información sobre tu visita. Usamos
        también tecnologías similares, como el almacenamiento de sesión del navegador (<em>sessionStorage</em>), que
        se tratan igual a efectos de esta política.
      </p>

      <h2>Cookies que utilizamos</h2>
      <p>
        Solo usamos <strong>cookies propias</strong>. No usamos cookies publicitarias ni de terceros, y los datos no
        se ceden a otras empresas.
      </p>
      {categories.map((category) => (
        <div key={category.id}>
          <h3>{category.title}</h3>
          <p>{category.description}</p>
        </div>
      ))}

      <div className="legal_table_wrap">
        <table className="legal_table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Finalidad</th>
              <th>Titular</th>
              <th>Duración</th>
            </tr>
          </thead>
          <tbody>
            {cookies.map((cookie) => (
              <tr key={cookie.name}>
                <td>
                  <code>{cookie.name}</code>
                  <br />
                  {categories.find((c) => c.id === cookie.category)?.title}
                </td>
                <td>{cookie.type}</td>
                <td>{cookie.purpose}</td>
                <td>{cookie.provider}</td>
                <td>{cookie.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Medición sin cookies</h2>
      <p>
        Aunque rechaces las cookies analíticas, registramos cada página visitada de forma anónima: ruta, dominio de
        procedencia, campaña (parámetros <code>utm_*</code> del enlace), tipo de dispositivo, navegador y sistema
        operativo (sin versión), idioma, ubicación aproximada (país, región y ciudad), tiempo en la página, hasta
        dónde te desplazas y cuánto tiempo está visible cada sección. Nos sirve para saber qué contenidos resultan
        útiles y mejorarlos. Este registro no utiliza cookies ni identificadores de persona: la ubicación se calcula a
        partir de tu dirección IP en el momento de la visita, pero la IP no se guarda.
      </p>

      <h2>Cómo gestionar o retirar tu consentimiento</h2>
      <p>
        Puedes aceptar, rechazar o cambiar tu elección en cualquier momento, con la misma facilidad con la que la
        diste. Al retirarlo, eliminamos de inmediato las cookies analíticas.
        {consent && (
          <>
            {" "}
            Tu elección actual: cookies analíticas <strong>{consent.analytics ? "aceptadas" : "rechazadas"}</strong>.
          </>
        )}
      </p>
      <p>
        <button type="button" className="btn btn_ghost" onClick={openPreferences}>
          Configurar cookies
        </button>
      </p>
      <p>
        También puedes borrar o bloquear las cookies desde la configuración de tu navegador (Edge, Chrome, Firefox o
        Safari). Si las bloqueas todas, algunas funciones de la web podrían no recordar tus preferencias.
      </p>

      <h2>Conservación de tu elección</h2>
      <p>
        Guardamos tu decisión durante 12 meses. Pasado ese plazo, o si cambiamos las finalidades descritas en esta
        política, te volveremos a preguntar.
      </p>

      <h2>Más información</h2>
      <p>
        Para cualquier duda escríbenos a <a href={`mailto:${site.email}`}>{site.email}</a>. Consulta también
        nuestra <Link to="/privacidad">Política de privacidad</Link>.
      </p>
    </LegalDocument>
  );
};

export default CookiesPolicy;
