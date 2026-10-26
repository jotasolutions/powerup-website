# Burbuja de WhatsApp

Botón flotante para escribir por WhatsApp a la persona que contesta (hoy, Fede). Código:
`components/landing/WhatsAppBubble.tsx`, montado en `app/layout.tsx` dentro de `CookieConsent`.

Objetivo: que un restaurante con dudas pueda escribir a una persona real sin quitar protagonismo al
objetivo de cada página (el alta y el Advisor).

## 1. Qué se ve

- Una **píldora** blanca abajo a la derecha: foto de Fede con un sello de WhatsApp y
  «¿Hablamos? · Te responde Fede», con un punto verde de «en línea». En móvil solo la foto con el
  sello. Pulsarla abre WhatsApp.
- Se ve una persona real a propósito: que se entienda que contesta un humano ayuda a convertir.
- **Nunca se abre ni se despliega sola.** No tapa contenido ni compite con los botones de alta.

Quién contesta está en `TEAM_MEMBER`, al principio del componente (nombre y foto). Si cambia la
persona, se cambia ahí y en la tarjeta de las preguntas frecuentes de la home
(`components/landing/FaqSection.tsx`, textos en `faqCopy.es` de `components/landing/home-copy.ts`),
que también lleva la foto de Fede y el botón «Pregúntame». La versión italiana de esa tarjeta
(`faqCopy.it`) no cambia.

## 2. Dónde aparece

- En toda la web: home, `/pricing`, `/pagina-web`, blog y páginas legales.
- **No** en las landings de Meta (`/vende-mas`, `/visibilidad`): ahí nada debe distraer del alta.
- **No** en la web italiana (`/it`): sus textos y el mensaje de WhatsApp están en italiano en
  `home-copy.ts`, y la burbuja solo existe en español.
- La lista está en `HIDDEN_PATHS`.

**Se aparta del QR de la home.** En ordenador, el hero de la home tiene abajo a la derecha el QR
«Ver ejemplo». En portátiles con poca altura (p. ej. 1280 × 800) la píldora lo tapaba (visto el
26-10-2026). Por eso, mientras ese QR está en pantalla, la píldora se esconde con un fundido y vuelve
al bajar. Cómo:

- el QR lleva el atributo `data-example-qr` (`components/landing/HeroSection.tsx`);
- la burbuja lo vigila con un `IntersectionObserver` (`STEP_ASIDE_SELECTOR`);
- en la home empieza escondida hasta que el observador responde, para que no aparezca un instante
  encima del QR al cargar (`PATHS_WITH_QR`);
- en móvil el QR no existe (`display: none`), así que la píldora se ve siempre.

Mover el QR no servía: a la izquierda tapa los logos de clientes y la nota en pantallas de 1024 px, y
arriba a la derecha choca con la tarjeta «Maridaje recomendado».

## 3. Mensaje ya escrito

El enlace abre WhatsApp con un texto según la página, para saber desde dónde escribe cada lead:

- `/pricing`: «Hola, estoy viendo los precios de PowerUp Menu y tengo una duda»
- `/pagina-web`: «Hola, me interesa la página web de PowerUp Menu»
- blog: «Hola, estaba leyendo el blog de PowerUp Menu y tengo una pregunta»
- resto: «Hola, tengo una pregunta sobre PowerUp Menu» (`COMPANY.whatsappUrl`)

## 4. Medición

El clic manda el `outbound_click` de siempre con `label: whatsapp` y `location: burbuja`. No hace
falta tocar GTM. Más detalle en `docs/medicion/README.md`.

## 5. Rendimiento y privacidad

- Es un enlace `wa.me`: sin scripts de terceros, sin cookies y sin guardar nada en el navegador.
- Por encima de la burbuja quedan el banner de cookies y los avisos de error del Advisor.

## 6. Historial: la tarjeta que se abría sola (descartada)

El 25-10-2026 se probó una tarjeta que salía de la píldora con una animación (como el «Morphing
Popover» de motion-primitives): foto, «Fede · CEO de PowerUp», un mensaje en primera persona y el
botón «Escribir a Fede». Se abría sola una vez por visita, después de los precios. Tenía reglas para
no tapar los precios ni los botones de alta, porque en móvil ocupa media pantalla.

El 26-10-2026 Fede la probó en local, no se comportaba como esperaba y decidió quitarla: se publica
solo la píldora. El código completo está en la rama `feat/burbuja-whatsapp`, commit `3cda00f`
(fichero y reglas en `docs/burbuja-whatsapp.md` de ese commit). Si se recupera, antes hay que
entender por qué no se abría en el Chrome de Fede.
