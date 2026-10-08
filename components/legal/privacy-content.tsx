import { COMPANY, SITE_URL_REF } from "@/components/legal/company-copy"

export function PrivacyContent() {
  return (
    <>
      <p>
        PowerUp Menu te informa sobre su Política de privacidad respecto al tratamiento y la
        protección de los datos personales de usuarios y clientes que puedan recogerse al navegar o
        contratar servicios a través del sitio web {SITE_URL_REF}.
      </p>
      <p>
        El Responsable garantiza el cumplimiento de la normativa vigente en materia de protección de
        datos personales, recogida en la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de
        Datos Personales y garantía de los derechos digitales (LOPDGDD), y en el Reglamento (UE)
        2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016 (RGPD).
      </p>
      <p>
        El uso del sitio web implica la aceptación de esta Política de privacidad y de los{" "}
        <a href="/terms">Términos y condiciones</a>.
      </p>

      <section className="space-y-4">
        <h2>Identidad del responsable</h2>
        <ul>
          <li>{COMPANY.legalName}</li>
          <li>CIF: {COMPANY.cif}</li>
          <li>Domicilio: {COMPANY.addressDisplay}</li>
          <li>
            Email: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          </li>
          <li>
            Teléfono / WhatsApp:{" "}
            <a href={`tel:${COMPANY.telephone}`}>{COMPANY.telephoneDisplay}</a>
          </li>
          <li>
            Sitio web: <a href={SITE_URL_REF}>{SITE_URL_REF}</a>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3>Principios aplicados al tratamiento</h3>
        <p>
          En el tratamiento de tus datos personales, el Responsable aplicará los siguientes
          principios conforme al RGPD:
        </p>
        <ul>
          <li>
            Licitud, lealtad y transparencia: se pedirá el consentimiento cuando sea necesario para
            el tratamiento.
          </li>
          <li>
            Minimización de datos: solo se solicitarán los datos estrictamente necesarios para la
            finalidad correspondiente.
          </li>
          <li>
            Limitación del plazo de conservación: los datos se conservarán el tiempo necesario para
            la finalidad del tratamiento.
          </li>
          <li>
            Integridad y confidencialidad: se adoptarán medidas para garantizar la seguridad y
            confidencialidad de los datos.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3>Obtención de datos personales</h3>
        <p>
          Para navegar por {SITE_URL_REF} no es necesario facilitar datos personales. Los casos en
          los que sí los facilitas son, entre otros:
        </p>
        <ul>
          <li>Al registrarte en el servicio o solicitar una demo o análisis de carta</li>
          <li>Al contactar con nosotros por email o WhatsApp</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3>Tus derechos</h3>
        <p>Respecto a tus datos personales, tienes derecho a:</p>
        <ul>
          <li>Solicitar el acceso a los datos almacenados</li>
          <li>Solicitar su rectificación o supresión</li>
          <li>Solicitar la limitación del tratamiento</li>
          <li>Oponerte al tratamiento</li>
          <li>Solicitar la portabilidad de los datos</li>
        </ul>
        <p>
          Para ejercer los derechos de acceso, rectificación, cancelación, portabilidad y oposición,
          envía un email a{" "}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> junto con una prueba de identidad
          válida (por ejemplo, copia del DNI o documento equivalente).
        </p>
      </section>

      <section className="space-y-4">
        <h3>Finalidad del tratamiento</h3>
        <p>
          Cuando te pones en contacto con el Responsable o contratas un servicio, facilitas
          información personal de la que PowerUp Menu es responsable.
        </p>
        <p>
          Al facilitarla, das tu consentimiento para que dicha información sea recogida, usada,
          gestionada y almacenada por {COMPANY.legalName}, únicamente según lo descrito en esta
          Política de privacidad y en los Términos y condiciones.
        </p>
        <ul>
          <li>
            Formulario de registro: se pueden solicitar nombre y apellidos, dirección de email y
            número de teléfono.
          </li>
          <li>
            Los datos que facilites al Responsable se alojan en servidores de Amazon AWS en
            Fráncfort (Alemania).
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3>Seguridad de los datos personales</h3>
        <p>
          Para proteger tus datos personales, el Responsable adopta las precauciones razonables y
          sigue las buenas prácticas del sector para evitar su pérdida, uso indebido, acceso no
          autorizado, revelación, alteración o destrucción.
        </p>
      </section>

      <section className="space-y-4">
        <h3>Contenido de otros sitios web</h3>
        <p>
          Las páginas de este sitio pueden incluir contenido incrustado (vídeos, imágenes, artículos,
          etc.). Ese contenido se comporta igual que si hubieras visitado el otro sitio web.
        </p>
      </section>

      <section className="space-y-4">
        <h3 id="cookies">Política de cookies</h3>
        <p>
          Para que este sitio funcione correctamente se utilizan cookies, información que se
          almacena en tu navegador. Puedes gestionar tus preferencias desde el enlace de Cookies del
          pie de página.
        </p>
      </section>

      <section className="space-y-4">
        <h3>Legitimación del tratamiento</h3>
        <p>
          La base jurídica del tratamiento de tus datos es el consentimiento y, cuando proceda, la
          ejecución de un contrato o el interés legítimo del Responsable.
        </p>
      </section>

      <section className="space-y-4">
        <h3>Categorías de datos personales</h3>
        <p>Las categorías de datos personales tratados por el Responsable son:</p>
        <ul>
          <li>Datos de identificación y de contacto</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3>Conservación de los datos personales</h3>
        <p>
          Los datos personales que facilites se conservarán hasta que solicites su eliminación o
          hasta que transcurra un tiempo razonable sin acceso por tu parte, salvo obligaciones
          legales de conservación.
        </p>
      </section>

      <section className="space-y-4">
        <h3>Destinatarios de los datos personales</h3>
        <p>
          Google Analytics es un servicio de analítica web prestado por Google, Inc. (1600
          Amphitheatre Parkway, Mountain View, California, CA 94043, Estados Unidos). Más
          información en: https://analytics.google.com
        </p>
      </section>

      <section className="space-y-4">
        <h3>Navegación web</h3>
        <p>
          Al navegar por {SITE_URL_REF} pueden recogerse datos no identificativos, como dirección IP,
          geolocalización, registro de uso de los servicios, hábitos de navegación u otros datos que
          no permiten identificarte por sí solos.
        </p>
        <p>El sitio utiliza los siguientes servicios de analítica de terceros:</p>
        <ul>
          <li>Google Analytics</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3>Exactitud y veracidad de los datos personales</h3>
        <p>
          Te comprometes a que los datos facilitados al Responsable sean correctos, completos,
          exactos y actuales, y a mantenerlos debidamente actualizados.
        </p>
      </section>

      <section className="space-y-4">
        <h3>Aceptación y consentimiento</h3>
        <p>
          Como usuario del sitio web, declaras haber sido informado de las condiciones sobre
          protección de datos personales, y aceptas y consientes su tratamiento por el Responsable
          en la forma y para las finalidades indicadas en esta Política de privacidad.
        </p>
      </section>

      <section className="space-y-4">
        <h3>Revocabilidad</h3>
        <p>
          Para ejercer tus derechos, envía un email a{" "}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> junto con una prueba de identidad
          válida.
        </p>
      </section>

      <section className="space-y-4">
        <h3>Cambios en la Política de privacidad</h3>
        <p>
          El Responsable se reserva el derecho de modificar esta Política de privacidad para
          adaptarla a novedades legislativas o jurisprudenciales, así como a prácticas del sector.
        </p>
        <p>Estas políticas estarán vigentes hasta que se sustituyan por otras debidamente publicadas.</p>
      </section>
    </>
  )
}
