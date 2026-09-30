import site from "../../data/site";
import LegalDocument, { Field } from "../../components/ui/LegalDocument";
import Seo from "../../features/seo/Seo";

/** Política de privacidad (art. 13 RGPD y LOPDGDD). Revisar con un profesional antes de publicar. */
const PrivacyPolicy = () => (
  <LegalDocument
    title="Política de privacidad"
    updated="2026-09-30"
    intro="Cómo tratamos tus datos personales conforme al RGPD y a la Ley Orgánica 3/2018 (LOPDGDD)."
  >
    <Seo
      title="Política de privacidad"
      description={`Información sobre el tratamiento de datos personales en ${site.name} conforme al RGPD y la LOPDGDD.`}
    />

    <h2>1. Responsable del tratamiento</h2>
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
    </ul>

    <h2>2. Qué datos tratamos y para qué</h2>
    <h3>Consultas y solicitudes de auditoría</h3>
    <p>
      Si nos escribes, tratamos tu nombre, correo electrónico, teléfono, empresa y la información que nos facilites para
      responderte y, en su caso, preparar una propuesta. Junto a tu consulta guardamos la ubicación aproximada desde la
      que la envías (país, región y ciudad, sin la IP) y cómo llegaste a la web (primera página visitada, dominio de
      procedencia y campaña), para conocer qué canales nos traen clientes. Al enviar el formulario te mandamos automáticamente un
      email confirmando que hemos recibido tu consulta. <strong>Base jurídica:</strong> aplicación de medidas
      precontractuales a petición tuya (art. 6.1.b RGPD) y tu consentimiento al contactarnos (art. 6.1.a RGPD).
    </p>
    <h3>Medición de visitas</h3>
    <p>
      Registramos de forma anónima las páginas visitadas, su procedencia y campaña, el tipo de dispositivo y navegador,
      la ubicación aproximada (país, región y ciudad, deducida de la IP sin guardarla), el tiempo de lectura y el
      desplazamiento por la página (sin cookies ni identificadores de persona). Si aceptas las cookies
      analíticas, asociamos además un identificador aleatorio de visitante y de sesión para contar visitantes
      únicos. <strong>Base jurídica:</strong> tu consentimiento (art. 6.1.a RGPD y art. 22.2 LSSI) para las cookies
      analíticas; interés legítimo en conocer el uso agregado de la web (art. 6.1.f RGPD) para el registro anónimo.
    </p>
    <h3>Registro de tu elección sobre cookies</h3>
    <p>
      Guardamos un identificador aleatorio, la fecha, la versión de la política y tu elección, para poder demostrar
      que has dado o rechazado el consentimiento. <strong>Base jurídica:</strong> cumplimiento de una obligación
      legal (art. 6.1.c y art. 7.1 RGPD).
    </p>

    <h2>3. Cuánto tiempo conservamos los datos</h2>
    <ul>
      <li>Consultas: el tiempo necesario para atenderlas y, después, durante los plazos de prescripción legal.</li>
      <li>Datos analíticos con identificador: un máximo de 24 meses; después se conservan solo agregados.</li>
      <li>Registro de consentimiento: mientras sea necesario para acreditarlo.</li>
    </ul>

    <h2>4. Destinatarios</h2>
    <p>
      No cedemos tus datos a terceros salvo obligación legal. Contamos con proveedores que actúan como encargados del
      tratamiento, con contrato conforme al art. 28 RGPD:
    </p>
    <ul>
      <li>
        <strong>Vercel Inc.</strong> (EE. UU.): alojamiento de la web y de la API.
      </li>
      <li>
        <strong>Neon</strong> (servidores en Frankfurt, UE): base de datos donde se guardan las consultas.
      </li>
      <li>
        <strong>Resend</strong> (EE. UU., envío desde servidores en la UE): envío del email de confirmación de tu
        consulta y de nuestras respuestas.
      </li>
      <li>
        <strong>IONOS</strong> (UE): alojamiento del buzón de correo en el que recibimos tus respuestas.
      </li>
      <li>
        <strong>Google</strong> (EE. UU.): Google Calendar y Google Meet, solo si concertamos una reunión contigo; recibe tu
        nombre y tu email para enviarte la invitación.
      </li>
    </ul>
    <p>
      Cuando un proveedor trata datos fuera del Espacio Económico Europeo, la transferencia se ampara en las garantías
      del RGPD (decisión de adecuación, como el Marco de Privacidad de Datos UE-EE. UU., o cláusulas contractuales
      tipo).
    </p>

    <h2>5. Tus derechos</h2>
    <p>
      Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y
      portabilidad, así como retirar tu consentimiento en cualquier momento, escribiendo a{" "}
      <a href={`mailto:${site.email}`}>{site.email}</a>. Si consideras que no hemos atendido correctamente tu
      solicitud, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (
      <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
        www.aepd.es
      </a>
      ).
    </p>

    <h2>6. Seguridad</h2>
    <p>
      Aplicamos medidas técnicas y organizativas adecuadas al riesgo: cifrado en tránsito (HTTPS), control de
      accesos, mínimo privilegio y minimización de datos.
    </p>
  </LegalDocument>
);

export default PrivacyPolicy;
