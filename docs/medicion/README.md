# Mapa de la medición de www.powerup.menu

Este documento es la referencia para las sesiones de IA que cambian esta web, y también para leer
los informes. Describe lo que está publicado:
- el código de `main` a 30-09-2026 (`5501d7b`);
- el contenedor de GTM `GTM-WX5BXSST` en su versión 22.

Si cambias algo de lo que se describe aquí, actualiza este documento en el mismo PR (apartado 9).

## 1. Qué se mide y con qué

| Herramienta | Qué hace | Dónde se configura | Cuándo se carga |
|---|---|---|---|
| Google Tag Manager `GTM-WX5BXSST` (contenedor «powerup.menu») | Reparte los eventos de la web entre Google Analytics, Meta y Umami | En GTM. Hay una copia en `gtm-WX5BXSST-v22.json` | Solo si la persona acepta las cookies de analítica (`components/GoogleTagManager.tsx`) |
| Google Analytics de la web: `G-CFJCMZXWX7`, propiedad `545089122` («PowerUp Website - NEW») | Todo lo que no cuelga de `/blog` | GTM y los ajustes de la propiedad | Con GTM |
| Google Analytics del blog: `G-X22L95WE0Y`, propiedad `407744305` («PowerUp Blog», la del blog viejo) | Todo lo que cuelga de `/blog` | GTM y los ajustes de la propiedad | Con GTM |
| Píxel de Meta `1582188126799857` | `PageView` y `Lead` | GTM | Con GTM y, además, con las cookies de marketing aceptadas |
| Umami (`umami.powerup.menu`) | Visitas, sin cookies | Etiqueta «Umami tracking code» de GTM | Con GTM: solo a quien acepta la analítica |
| Vercel Web Analytics y Speed Insights | Visitas, sin cookies, y rendimiento | `app/layout.tsx` (`<Analytics/>` y `<SpeedInsights/>`). Los datos se ven en el panel de Vercel del equipo jotasolutions | Siempre, sin pasar por el banner |
| Captura de atribución | Guarda los parámetros de la URL de llegada y los añade a los enlaces de alta | `components/AttributionCapture.tsx` y `lib/attribution.ts` (localStorage `powerup_attribution`) | Siempre |

No hay Conversions API de Meta, y Consent Mode no funciona (apartado 2).

Otras webs del ecosistema tienen su propia medición y no entran en este mapa:
- `admin.powerup.menu` tiene su propio contenedor, su Analytics y su píxel de Meta;
- `alta-pagina-web.powerup.menu`, el asistente de web, usa PostHog.

## 2. Consentimiento

- El banner está en `components/CookieConsent.tsx` y en `components/cookie-consent/`. Tiene tres
  categorías: analítica, marketing y preferencias.
- La elección se guarda en el localStorage, en `cookie-consent`. Desde el 29-09 también se guarda
  en la cookie `pu_consent` de `.powerup.menu`, que comparte con el asistente de web. Al cargar
  la página gana la elección más reciente, y `cookie-consent` se reescribe antes de que se cargue
  GTM.
- GTM solo se monta con la analítica aceptada. Sin ella no se carga Google Analytics, ni Meta, ni
  Umami. Vercel Analytics sí se carga.
- Meta necesita además el marketing aceptado. La variable de GTM `js.marketing_aceptado` lee
  `cookie-consent` (`categories.marketing === true`). Las Google tags pasan ese mismo valor a
  `allow_google_signals` y a `allow_ad_personalization_signals`.
- Consent Mode de Google está configurado en `CookieConsent.tsx`, pero no funciona:
  `GoogleConsentMode` no se monta y `window.gtag` no existe. Por eso GTM da todo el consentimiento
  por concedido, y la puerta de Meta tiene que leer el localStorage.
- Cuando alguien cambia de opinión a mitad de visita:
  - si retira el consentimiento, lo que ya se cargó sigue funcionando hasta que recarga la página;
  - si acepta el marketing, Meta empieza en el siguiente cambio de página.

## 3. Cómo viaja un evento

1. **Sale del código**, de una de dos formas:
   - **Un clic en un elemento marcado con `trackAttrs()`.** La función
     `trackAttrs(evento, { label, location, linkUrl })` (`lib/analytics/attributes.ts`) añade
     atributos `data-track-*` al elemento. `AnalyticsListener`
     (`components/analytics/AnalyticsListener.tsx`) escucha los clics de toda la página y manda el
     evento con estos datos:
     - `event_label`: el `label`, o el texto del elemento;
     - `link_url`: el `linkUrl`, o el `href` del enlace;
     - `link_text`: el texto del elemento;
     - `location`: la del elemento, o la del contenedor más cercano con `data-track-location`.
   - **Una llamada directa a `trackEvent(evento, params)`**: la usan el Advisor, el carrusel, los
     precios y el enlace de cookies.
2. **Llega al dataLayer** a través de `pushToDataLayer()` (`lib/analytics/track.ts`):
   - solo si la analítica está aceptada;
   - añade un `event_id` aleatorio;
   - antes borra las claves del evento anterior que el nuevo no trae, para que no se mezclen.
3. **GTM lo reparte:**
   - **La parte de la web.** La variable `js.seccion` vale `blog` si la ruta empieza por `/blog`, y
     `web` en cualquier otro caso. Mira el `page_path` del evento o, si no lo trae, la ruta de la
     página.
   - **Las Google tags.** Cada propiedad tiene la suya, con `send_page_view` en `false`: las
     páginas vistas las manda la web. Se carga en «Inicialización» si se entra por su parte y, si
     no, justo antes del primer evento de su parte.
   - **Adónde van los eventos.** Los eventos de la lista van a la propiedad de su parte. Además,
     `sign_up_click`, `advisor_step_1_complete` y `generate_lead`, cuando pasan en el blog, van
     también a la propiedad de la web, con `seccion = blog`.
   - **Qué parámetros llegan a Analytics:**
     - `location`;
     - `event_label`;
     - `link_url`, sin lo que va detrás de `?`;
     - `link_text`;
     - `section_name`;
     - `form_name`;
     - `billing_period`;
     - `seccion`, solo en la propiedad de la web.

     Los demás parámetros del dataLayer no se mandan.
   - **Meta.** Recibe un `PageView` en cada `page_view` y un `Lead` en cada `sign_up_click`, las
     dos veces solo con el marketing aceptado.

## 4. Eventos

Los nombres salen de `ANALYTICS_EVENTS` (`lib/analytics/events.ts`), salvo `logo_click`, que está
escrito tal cual en `NavMenu.tsx`. «Su parte» quiere decir la propiedad de la parte de la web
donde pasa el evento: la de la web o la del blog.

| Evento | Qué hace la persona | Dónde (código y zona) | Qué llega a Analytics | Adónde va | Meta | Evento clave |
|---|---|---|---|---|---|---|
| `page_view` | Abre o cambia de página, también sin recarga | `AnalyticsListener`, en cada cambio de ruta o de parámetros | `page_location`, `page_title` | Su parte | `PageView` (`page_path`, `eventID`) | No |
| `sign_up_click` | Pulsa un botón de alta | `CTAButton` (casi todas las secciones), `NavMenu` (`nav_desktop`, `nav_mobile`), y `SignUpTextLink` y `PostCta` en el blog (`blog`) | `location`, `event_label`, `link_url`, `link_text` | Su parte; si pasa en el blog, también la web | `Lead` (`content_name` = etiqueta, `content_category` = enlace completo) | No |
| `login_click` | Pulsa «Login» | `NavMenu` | Los mismos cuatro datos | Su parte | — | No |
| `nav_click` | Usa el menú («Evalúa tu carta», «Página web», «Precios») o el pie («Blog», «Términos y condiciones», «Política de privacidad»), o pulsa «Analizar mi carta» en el blog (`label: advisor`) | `NavMenu`, `FooterSection` y `app/blog/_components/AdvisorDialog.tsx` | Los mismos cuatro datos | Su parte | — | No |
| `logo_click` | Pulsa el logo | `NavMenu` (`location: nav`) | Los mismos cuatro datos | Su parte | — | No |
| `outbound_click` | Sale a otra web por un enlace marcado | Testimonios (Trustpilot, Google Maps y cartas de clientes), «Ver ejemplo» de `/pagina-web`, y en el blog Maestro, la prensa y los enlaces a Maestro dentro de los artículos (`lib/blog/markdown.ts`) | Los mismos cuatro datos | Su parte | — | No |
| `example_menu_click` | Pulsa «Ver carta de ejemplo» | El hero de la home y el recuadro de los artículos | Los mismos cuatro datos | Su parte | — | No |
| `menu_showcase_click` | Pulsa «Ver carta» en el carrusel de la home | `MenuShowcaseSection` (`menu_showcase`) | Los mismos cuatro datos | Web | — | No |
| `menu_showcase_slide` | Cambia de diapositiva en el carrusel de la home. **También sale al cargar la home**, aunque nadie lo toque | `ShowcaseCarousel` | `location`; no llegan `slide_index` ni `menu_url` | Web | — | No |
| `section_view` | Ve una sección: al menos el 35 % entra en pantalla. Una vez por sección y página | `AnalyticsListener`, en los elementos con `data-track-section`: un `SectionContainer` con `id`, y el hero | `section_name` | Su parte | — | No |
| `advisor_step_1_complete` | Completa el paso 1 del Advisor: elige su restaurante y sube archivos | `components/AdvisorWidget.tsx`, en la home (`#advisor`) y en el diálogo del blog | `location` (`advisor`); no llegan `restaurant_name` ni `files_count` | Su parte; si pasa en el blog, también la web | — | No |
| `generate_lead` | Envía el paso 2 del Advisor (nombre, email, teléfono y rol) y el envío sale bien | `AdvisorWidget` | `location` y `form_name` (los dos `advisor`); no llegan `restaurant_name` ni `role` | Su parte; si pasa en el blog, también la web | — | **Sí**, en las dos propiedades |
| `cookie_settings_open` | Abre «Cookies» en el pie | `components/CookieSettingsLink.tsx` | `location` (`footer`) | Su parte | — | No |
| `pricing_billing_tab_click` | Cambia entre pago anual y mensual | `components/landing/PricingCards.tsx` | `billing_period`, `event_label`, `location` (`pricing`) | Su parte | — | No |
| `file_upload` | — | Está definido en `events.ts`, pero nadie lo manda y GTM no lo recoge | — | — | — | — |

Notas:
- `sign_up_click` no siempre es un alta de carta:
  - en `/pagina-web`, los botones llevan al asistente de web (`alta-pagina-web.powerup.menu`);
  - el botón «Más información de la web» de la home lleva a `/pagina-web`.

  En Analytics se distinguen por `link_url` (apartado 8).
- A Meta, el `Lead` le llega de cada `sign_up_click`, no de `generate_lead`. Qué cuenta como Lead
  en Meta se decide en la fase 1.
- Todos los eventos llevan `event_id` en el dataLayer. Meta lo usa como `eventID`; Analytics no lo
  recibe.

## 5. Valores de `location` y `section_name`

Salen del código y los comprobé en las páginas publicadas el 30-09.

**`location`:**
- menú: `nav` (el logo), `nav_desktop` y `nav_mobile`;
- pie: `footer`;
- home: `hero`, `vende-mas`, `features`, `admin`, `diferenciacion`, `advisor`, `pagina-web`,
  `testimonials`, `testimonials_carousel`, `menu_showcase` y `pricing`;
- `/pagina-web`: `website_hero`, `website-pain-points`, `website_benefits`, `website_outstand`,
  `website-pages`, `website_builder`, `website_comparison` y `website_pricing`. En el código
  también están `website_final_cta` (su `location`) y `website-final-cta` (su `section_name`), de
  `WebsiteFinalCtaSection`: `app/pagina-web/page.tsx` la importa, pero no la muestra;
- `/pricing`: `pricing`;
- blog: `blog`.

Una sección hecha con `SectionContainer id="…"` pasa su `id` como `location` a los botones que
contiene. Por eso muchos valores coinciden con los de `section_name`.

**`section_name`** (el `id` de cada sección):
- home: `hero`, `vende-mas`, `features`, `admin`, `diferenciacion`, `advisor`, `pagina-web`,
  `testimonials`, `menu-showcase`, `pricing` y `footer`;
- `/pagina-web`: `website-hero`, `website-pain-points`, `website-benefits`, `website-showcase`,
  `website-outstand`, `website-pages` (en dos secciones), `website-builder`, `testimonials`,
  `website-comparison`, `website-pricing` y `footer`;
- `/pricing`: `pricing`, `testimonials` y `footer`;
- el blog y las páginas legales: solo `footer`.

## 6. Lo que añade Google por su cuenta

Es la medición mejorada, igual en los dos flujos. Lo comprobé en el `gtag/js` público el 30-09.
- **`scroll`**: sale al llegar al 90 % de la página. Está pensado para cargas completas, así que
  en los cambios de página sin recarga puede no volver a salir.
- **`click` con `outbound = true`**: clics hacia otros dominios. Puede coincidir con nuestro
  `outbound_click`.
- **`form_start` y `form_submit`**: el uso de formularios, como el del Advisor.
- **`file_download`, `view_search_results` y los de vídeo de YouTube**: la web casi no los usa.
- **`first_visit`, `session_start` y `user_engagement`**: los mismos que en cualquier propiedad.
- **Las páginas vistas por el historial del navegador están desactivadas** en los dos flujos, y
  deben seguir así.

## 7. Ajustes de las propiedades de Analytics (30-09)

- **Google signals**: desactivado en todas las regiones, en las dos propiedades.
- **Recogida automática de datos proporcionados por el usuario**: activada en las dos (email,
  teléfono y dirección). Ver el apartado 8.
- **Emails en las URL**: se ocultan.
- **Retención de los datos de eventos**: 14 meses, en las dos.
- **Eventos clave**: `generate_lead`, en las dos. Además está `purchase`, que viene por defecto.
- **Dimensiones personalizadas**, todas con ámbito de evento:

  | Parámetro | Nombre | Propiedad |
  |---|---|---|
  | `location` | Ubicación del clic | Las dos |
  | `event_label` | Etiqueta del clic | Las dos |
  | `section_name` | Sección vista | Las dos |
  | `form_name` | Formulario | Las dos |
  | `billing_period` | Periodo de pago | Las dos |
  | `seccion` | Web o blog | Solo la web |

  La propiedad del blog conserva además 10 dimensiones de MonsterInsights, del blog viejo (2023).
  Ya no reciben datos.
- **`link_url` y `link_text`** no necesitan dimensión propia: Analytics ya las tiene («URL del
  enlace» y «Texto del enlace»).

## 8. Problemas conocidos y límites

Aquí solo se apuntan. Cada arreglo va con su propio plan y con el OK de Fede.

**En el código de la web:**
1. **Hay botones de alta sin `location`: 5 en la home y 5 en `/pricing`.**
   - Están en secciones hechas con `SectionContainer` pero sin `id`: `AttractPeopleSection`,
     `AnalyticsSection`, `HowItWorksSection`, `FaqSection`, `AboutSection` y las de
     `components/landing/pricing/`.
   - Esas secciones tampoco mandan `section_view`, como tampoco `BigTextSection`, el bloque de
     texto grande de la home y de `/pricing`. En total, no se miden 6 de las 17 secciones de la
     home ni 6 de las 9 de `/pricing`.
   - En los informes, sus clics salen como «(not set)».
2. **«Más información de la web» cuenta como clic de alta.** Es un `CTAButton` de `WebsiteSection`,
   en la home, que lleva a `/pagina-web`. Cuenta como `sign_up_click`, y Meta lo recibe como Lead.
3. **En `/pagina-web`, `sign_up_click` lleva al asistente de web**, no al alta de la carta. En
   Analytics se separan por `link_url`, pero Meta los junta en Lead.
4. **En las tarjetas de precios, el botón del plan Pro y el del Free mandan lo mismo.** Son dos
   `CTAButton` sin datos propios en `PricingCards.tsx`, dentro de la sección `pricing` de la home y
   de `/pricing`: la misma etiqueta, el mismo enlace y la misma `location`. No se sabe cuál se
   pulsó.
5. **«Pregúntanos», el botón de WhatsApp de las preguntas frecuentes de la home, no hace nada.** Es
   un `Button` sin enlace ni `trackAttrs()` en `FaqSection.tsx`: no lleva a WhatsApp y no se mide.
   Comprobado en la web publicada el 01-10.
6. **Dos secciones de `/pagina-web` tienen el mismo `id`**, `website-pages`:
   `WebsiteAnalyticsSection` y `WebsitePagesSection`. Solo cuenta la primera que se ve.
7. **En el móvil, las secciones muy altas pueden no contar.** `section_view` sale cuando se ve a
   la vez el 35 % de la sección. Medido el 01-10 en un móvil de 375 × 812 px:
   - `features` llega justo al 37 %, así que en móviles más pequeños no contaría;
   - la sección del plan Pro de `/pricing` se queda en el 23 %: aunque tuviera `id`, no contaría
     nunca.
8. **Los valores de `location` mezclan guiones y guiones bajos**: `website-pages` frente a
   `website_hero`.
9. **`logo_click` no está en `ANALYTICS_EVENTS`**, y `file_upload` está, pero no se usa.
10. **`menu_showcase_slide` sale al cargar la home**, porque el carrusel lo manda al montarse. No
   siempre es un gesto de la persona.
11. **Consent Mode no funciona** (apartado 2).
12. **La captura de atribución guarda todos los parámetros de la URL**, no solo los UTM: también
   `gtm_debug`, `fbclid` y otros. Luego los añade a los enlaces de alta y a los del asistente de
   web.

**Fuera del código:**

13. **Umami solo cuenta a quien acepta la analítica**, porque se carga desde GTM. Vercel Analytics
    sí cuenta a todos.
14. **El dominio de Vercel, `powerup-website-chi.vercel.app`, también se mide**, porque carga el
    mismo GTM.
15. **La recogida automática de datos proporcionados por el usuario está activada** en las dos
    propiedades. Con ella, Google puede leer los emails y teléfonos que la persona escribe en la
    web, por ejemplo en el Advisor, y enviarlos cifrados. Conviene revisar si se quiere y si la
    política de privacidad lo cubre.
16. **Meta.** El contenedor no apaga los eventos automáticos del píxel (`autoConfig`). Si están
    activados en el Administrador de eventos, Meta añade eventos propios, como los clics en
    botones.
17. **«Tiempo real» y DebugView no enseñan todos los eventos.** Se comprobó el 29-09: los eventos
    llegan y se cuentan en los informes, pero no siempre salen en vivo. Para comprobar números, usa
    el informe del día siguiente.
18. **Cuando una visita pasa de la web al blog:**
    - algunos eventos automáticos de Google, como el scroll o los clics salientes, pueden llegar
      también a la otra propiedad;
    - si la visita solo ve el blog, sus clics de alta y su Advisor llegan a la web sin el ajuste
      de Google signals. Se aceptó así, y hoy Google signals está apagado.

## 9. Reglas para cambiar la web sin romper la medición

1. **Botones y enlaces.** Todo enlace o botón que haya que medir lleva `trackAttrs()`, con un
   evento de `ANALYTICS_EVENTS`. Si es nuevo, lleva también un `location`.
2. **Enlaces de alta.**
   - Usan `CTAButton` en la web y `SignUpTextLink` en el blog.
   - Nunca un enlace escrito a mano a `admin.powerup.menu/sign-up`: se perderían los UTM (los añade
     `useAttributedCtaUrl`) y el `sign_up_click`, y con él el Lead de Meta.
   - Un enlace que solo navega dentro de la web no usa `sign_up_click`: usa `nav_click`.
3. **Secciones nuevas.** Usan `SectionContainer` con un `id` único en la página, en minúsculas y
   con guiones. Sin `id` no hay `section_view` ni `location`.
4. **Nombres de eventos.**
   - No renombres ni quites un evento sin cambiar a la vez el contenedor.
   - Un evento nuevo se añade en tres sitios:
     - en `ANALYTICS_EVENTS`;
     - en los activadores de GTM: `eventos · web` y `eventos · blog`, y además
       `alta y Advisor en el blog` si es de alta o del Advisor;
     - en este mapa.
   - Un parámetro nuevo que deba verse en Analytics también se añade a las etiquetas de eventos de
     GTM, y hay que registrar su dimensión.
5. **Páginas vistas.** `page_view` solo lo manda `AnalyticsListener`. No lo mandes desde otro sitio
   ni actives las páginas vistas automáticas de Google, ni con `send_page_view` ni con la casilla
   del historial de los flujos de Analytics: saldrían dobles.
6. **El blog.** Todo lo que cuelga de `/blog` va a la propiedad del blog. Si cambia esa ruta, hay
   que cambiar `js.seccion` en GTM.
7. **Datos personales.** No mandes datos personales en los eventos: ni nombres, ni emails, ni
   teléfonos. `restaurant_name` va al dataLayer, pero GTM no lo pasa a Analytics, y así debe
   seguir.
8. **Scripts de medición.** No cargues ninguno fuera del banner de cookies. Las únicas excepciones
   son Vercel Analytics y Speed Insights, que no usan cookies.
9. **Este mapa.** Actualízalo en el mismo PR que cambie la medición. Si cambia el contenedor,
   sustituye también la copia (`gtm-WX5BXSST-vNN.json`).

## 10. Cómo se cambia el contenedor de GTM

La IA no entra en GTM, en Google Analytics ni en Meta, y no maneja claves. El trabajo se reparte
así:
1. La IA pide a Fede un export nuevo del contenedor publicado: Administrar → Exportar contenedor.
2. La IA prepara un archivo de importación a partir de ese export y escribe una guía. Antes lo
   comprueba:
   - la estructura del archivo;
   - las referencias entre piezas;
   - que el JavaScript esté en ES5;
   - que los nombres de los eventos coincidan con el código.
3. Fede lo importa en el espacio de trabajo existente, con «Sobrescribir». Después lo prueba en
   vista previa y lo publica.
4. Se actualizan la copia del contenedor de esta carpeta y este mapa.

Los cambios en Analytics o en Meta los hace Fede, o Claude in Chrome con su permiso.

## 11. Cómo comprobar

- **Vista previa de GTM (Tag Assistant)**: enseña qué etiquetas salen con cada evento.
- **Las peticiones de red del navegador:**
  - a `google-analytics.com/g/collect`, donde `tid` es la propiedad y `en` el evento;
  - a `facebook.com/tr`, con `ev=PageView` o `ev=Lead`.
- **Los informes de Analytics del día siguiente**, por «Ruta de la página». «Tiempo real» sirve
  para ver que nada llega a la propiedad que no toca, no para contar.
- **Sin cookies de analítica**, no debe salir nada hacia Google, Meta ni Umami. Hacia Vercel, sí.

## 12. Historial

- **28-09-2026:** sale el blog en `/blog`. Hasta el 30-09, sus visitas van a la propiedad de la
  web.
- **30-09-2026:** se publica la versión 22 del contenedor, la fase 0 de la medición:
  - el blog pasa a su propia propiedad de Analytics;
  - Meta solo recibe datos con el marketing aceptado;
  - Analytics empieza a recibir los eventos propios de la web.

  El mismo día, en Analytics: casillas del historial desmarcadas, dimensiones personalizadas,
  evento clave `generate_lead` y retención de 14 meses.
