import { Link } from "react-router-dom";
import site from "../../data/site";
import LegalDocument, { Field } from "../../components/ui/LegalDocument";
import Seo from "../../features/seo/Seo";

/** Aviso legal (art. 10 de la Ley 34/2002, LSSI-CE). */
const LegalNotice = () => (
  <LegalDocument
    title="Aviso legal"
    updated="2026-09-30"
    intro="Información general sobre el titular de este sitio web y las condiciones de uso."
  >
    <Seo title="Aviso legal" description={`Aviso legal y condiciones de uso del sitio web de ${site.name}.`} />

    <h2>1. Datos identificativos</h2>
    <p>
      En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio
      Electrónico (LSSI-CE), se informa de los datos del titular de {site.website.replace("https://", "")}:
    </p>
    <ul>
      <li>
        Titular: <Field value={site.owner.name} />
      </li>
      <li>
        NIF: <Field value={site.owner.nif} />
      </li>
      <li>
        Domicilio: <Field value={site.owner.address} />
      </li>
      <li>
        Correo electrónico: <a href={`mailto:${site.email}`}>{site.email}</a>
      </li>
      {site.owner.registry && (
        <li>
          Registro: <Field value={site.owner.registry} />
        </li>
      )}
    </ul>

    <h2>2. Objeto</h2>
    <p>
      Este sitio web informa sobre los servicios de auditoría, consultoría y automatización en Microsoft Entra ID y
      Microsoft 365 que presta {site.name}. El acceso implica la aceptación de este aviso legal.
    </p>

    <h2>3. Propiedad intelectual e industrial</h2>
    <p>
      Los contenidos, diseño, logotipos y código de este sitio pertenecen a su titular o cuentan con licencia para su
      uso. Queda prohibida su reproducción o distribución sin autorización. Microsoft, Microsoft 365 y Microsoft
      Entra son marcas de Microsoft Corporation; su mención tiene carácter descriptivo y no implica afiliación.
    </p>

    <h2>4. Responsabilidad</h2>
    <p>
      El titular no se responsabiliza del mal uso de los contenidos ni de los daños derivados de interrupciones del
      servicio ajenas a su control. Los enlaces a sitios de terceros se ofrecen a título informativo.
    </p>

    <h2>5. Protección de datos y cookies</h2>
    <p>
      Consulta la <Link to="/privacidad">Política de privacidad</Link> y la <Link to="/cookies">Política de cookies</Link>.
    </p>

    <h2>6. Legislación aplicable</h2>
    <p>Este aviso legal se rige por la legislación española.</p>
  </LegalDocument>
);

export default LegalNotice;
