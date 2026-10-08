import { COMPANY, SITE_URL_REF } from "@/components/legal/company-copy"

export function TermsContent() {
  return (
    <>
      <p>
        Estos términos y condiciones («Acuerdo») regulan el uso del sitio web {SITE_URL_REF} («Sitio
        web» o «Servicio») y de los productos y servicios relacionados (en conjunto, los
        «Servicios») ofrecidos por {COMPANY.legalName} («PowerUp Menu», «nosotros» o «nuestro»), con
        CIF {COMPANY.cif} y domicilio en {COMPANY.addressDisplay}.
      </p>
      <p>
        Al acceder y usar el Sitio web y los Servicios, confirmas que has leído, comprendido y
        aceptas quedar vinculado por este Acuerdo. Si contratas en nombre de una empresa u otra
        entidad legal, declaras tener autoridad para vincularla; en ese caso, «Usuario», «tú» o
        «tu» se referirán a dicha entidad. Si no tienes esa autoridad o no estás de acuerdo con
        estos términos, no debes aceptar el Acuerdo ni usar el Sitio web ni los Servicios.
      </p>

      <section className="space-y-4">
        <h2>Identidad del prestador</h2>
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
        <h2>Cuentas y membresía</h2>
        <p>
          Si eres usuario registrado, eres responsable de mantener la seguridad de tu cuenta y de
          todas las actividades que se realicen bajo ella. Podemos revisar cuentas nuevas antes de
          permitir el acceso. Facilitar datos de contacto falsos puede conllevar la cancelación de
          la cuenta. Debes notificarnos de inmediato cualquier uso no autorizado o vulneración de
          seguridad. Podemos suspender, desactivar o eliminar tu cuenta si consideramos que has
          incumplido este Acuerdo o que tu conducta perjudica nuestra reputación.
        </p>
      </section>

      <section className="space-y-4">
        <h3>Contenido del usuario</h3>
        <p>
          No somos propietarios de los datos, información o materiales («Contenido») que envíes o
          crees al usar el Servicio (cartas, textos, imágenes, diseños, logos, etc.). Eres el
          único responsable de la exactitud, legalidad y derechos sobre ese Contenido. Nos
          concedes permiso para acceder, copiar, almacenar, transmitir y mostrar el Contenido de tu
          cuenta únicamente en la medida necesaria para prestarte los Servicios. También nos
          concedes licencia para usar, reproducir, adaptar, publicar o distribuir Contenido creado
          o almacenado en tu cuenta con fines comerciales o de marketing relacionados con PowerUp
          Menu, salvo pacto en contrario.
        </p>
      </section>

      <section className="space-y-4">
        <h3>Facturación y pagos</h3>
        <p>
          Abonarás las tarifas aplicables según los precios y condiciones vigentes en el momento del
          cargo. Si hay periodo de prueba gratuito, el cobro podrá iniciarse al finalizar ese
          periodo. Si la renovación automática está activada, se te cobrará según el plan elegido.
          Nos reservamos el derecho a cambiar productos y precios en cualquier momento, y a rechazar
          o limitar pedidos. Los impuestos aplicables (incluido el IVA) se añadirán cuando
          corresponda.
        </p>
      </section>

      <section className="space-y-4">
        <h3>Exactitud de la información</h3>
        <p>
          En el Sitio web puede haber errores tipográficos, inexactitudes u omisiones relativas a
          descripciones, precios, disponibilidad o promociones. Nos reservamos el derecho a
          corregirlos y a actualizar la información o cancelar pedidos si alguna información es
          inexacta, sin aviso previo (incluso después de haber enviado un pedido), en la medida
          permitida por la ley.
        </p>
      </section>

      <section className="space-y-4">
        <h3>Copias de seguridad</h3>
        <p>
          Realizamos copias de seguridad periódicas del Sitio web y de su Contenido y procuramos su
          integridad. En caso de fallo de hardware o pérdida de datos, restauraremos las copias
          disponibles para minimizar el impacto, sin garantizar recuperación total en todos los
          escenarios.
        </p>
      </section>

      <section className="space-y-4">
        <h3>Enlaces a otros recursos</h3>
        <p>
          El Sitio web y los Servicios pueden enlazar a recursos de terceros. Salvo que se indique
          expresamente, ello no implica aprobación ni afiliación. No somos responsables del
          contenido, productos o prácticas de esos terceros. El acceso a recursos externos es bajo
          tu propia responsabilidad.
        </p>
      </section>

      <section className="space-y-4">
        <h3>Usos prohibidos</h3>
        <p>
          Queda prohibido usar el Sitio web, los Servicios o el Contenido: (a) con fines ilegales;
          (b) para solicitar o participar en actos ilícitos; (c) para vulnerar normas aplicables;
          (d) para infringir derechos de propiedad intelectual propios o ajenos; (e) para acosar,
          difamar o discriminar; (f) para enviar información falsa o engañosa; (g) para transmitir
          malware; (h) para hacer spam, phishing o scraping abusivo; (i) con fines obscenos o
          inmorales; o (j) para eludir medidas de seguridad. Podremos dar por terminado el uso de
          los Servicios ante cualquiera de estas conductas.
        </p>
      </section>

      <section className="space-y-4">
        <h3>Propiedad intelectual</h3>
        <p>
          Este Acuerdo no te transmite ningún derecho de propiedad intelectual de PowerUp Menu ni de
          terceros. Marcas, gráficos, logos y software del Sitio web y de los Servicios son
          propiedad de {COMPANY.legalName} o de sus licenciantes. El uso del Sitio web no te
          concede licencia para reproducir o explotar dichas marcas o materiales, salvo lo
          expresamente autorizado.
        </p>
      </section>

      <section className="space-y-4">
        <h3>Exención de garantías</h3>
        <p>
          El Servicio se presta «tal cual» y «según disponibilidad». En la medida permitida por la
          ley aplicable, excluimos garantías implícitas de comerciabilidad, idoneidad para un fin
          concreto y no infracción. No garantizamos que el Servicio sea ininterrumpido, seguro o
          libre de errores, ni resultados concretos derivados de su uso.
        </p>
      </section>

      <section className="space-y-4">
        <h3>Limitación de responsabilidad</h3>
        <p>
          En la máxima medida permitida por la ley aplicable, {COMPANY.legalName}, sus afiliados,
          administradores, empleados o proveedores no serán responsables de daños indirectos,
          incidentales, especiales, punitivos o consecuentes, incluidos lucro cesante, pérdida de
          datos o interrupción de negocio. Salvo dolo o negligencia grave, la responsabilidad
          agregada frente a ti se limitará, como máximo, a las cantidades efectivamente abonadas a
          PowerUp Menu por el Servicio en el mes anterior al hecho generador.
        </p>
      </section>

      <section className="space-y-4">
        <h3>Indemnización</h3>
        <p>
          Te comprometes a indemnizar y mantener indemne a PowerUp Menu y a sus afiliados,
          administradores, empleados y proveedores frente a reclamaciones de terceros derivadas de
          tu Contenido, del uso de los Servicios o de una conducta dolosa por tu parte.
        </p>
      </section>

      <section className="space-y-4">
        <h3>Nulidad parcial</h3>
        <p>
          Si alguna disposición de este Acuerdo se declara ilegal, inválida o inaplicable, el resto
          permanecerá en vigor en la medida legalmente posible.
        </p>
      </section>

      <section className="space-y-4">
        <h3>Ley aplicable y jurisdicción</h3>
        <p>
          La formación, interpretación y ejecución de este Acuerdo, y cualquier disputa derivada del
          mismo, se regirán por la legislación española. Salvo norma imperativa en contrario, las
          partes se someten a los juzgados y tribunales de València (España).
        </p>
      </section>

      <section className="space-y-4">
        <h3>Cesión</h3>
        <p>
          No puedes ceder ni transferir tus derechos u obligaciones bajo este Acuerdo sin nuestro
          consentimiento previo por escrito. Nosotros podemos ceder nuestros derechos u obligaciones
          en el marco de una venta, fusión u operación societaria similar.
        </p>
      </section>

      <section className="space-y-4">
        <h3>Cambios</h3>
        <p>
          Podemos modificar este Acuerdo publicando una versión actualizada en el Sitio web. El uso
          continuado del Sitio web o de los Servicios tras la publicación implica la aceptación de
          los cambios, en la medida permitida por la ley.
        </p>
      </section>

      <section className="space-y-4">
        <h3>Aceptación</h3>
        <p>
          Al acceder y usar el Sitio web y los Servicios aceptas este Acuerdo. Si no estás de
          acuerdo, no estás autorizado a usarlos.
        </p>
      </section>

      <section className="space-y-4">
        <h3>Contacto</h3>
        <p>
          Para cualquier consulta sobre este Acuerdo puedes escribir a{" "}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> o contactar por WhatsApp en{" "}
          <a href={COMPANY.whatsappUrl} target="_blank" rel="noopener noreferrer">
            {COMPANY.telephoneDisplay}
          </a>
          . Domicilio: {COMPANY.addressDisplay}.
        </p>
      </section>
    </>
  )
}
