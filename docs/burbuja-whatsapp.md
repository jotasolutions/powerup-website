# Burbuja de WhatsApp

Botón flotante para escribir por WhatsApp a la persona que contesta (hoy, Fede). Código:
`components/landing/WhatsAppBubble.tsx`, montado en `app/layout.tsx` dentro de `CookieConsent`.

Objetivo: que un restaurante con dudas pueda escribir a una persona real sin quitar protagonismo al
objetivo de cada página (el alta y el Advisor).

## 1. Qué se ve

- **Píldora** (siempre, abajo a la derecha): foto de Fede con un sello de WhatsApp y
  «¿Hablamos? · Te responde Fede». En móvil solo la foto con el sello. Pulsarla abre WhatsApp.
- **Tarjeta** (como mucho una vez por visita, ver apartado 3): la píldora se transforma en una
  tarjeta con foto, «Fede · CEO de PowerUp», un mensaje en primera persona, el botón
  «Escribir a Fede» y «Te contesta una persona, no un bot». La ✕ la vuelve a convertir en píldora.
- Se ve una persona real a propósito: que se entienda que contesta un humano ayuda a convertir.
- La animación (la píldora se convierte en tarjeta) usa `motion` con un `layoutId` compartido, como
  el «Morphing Popover» de motion-primitives (21st.dev). Con «reducir movimiento» activado en el
  sistema, no hay animación.

Quién contesta está en `TEAM_MEMBER`, al principio del componente (nombre, cargo y foto). Si cambia
la persona, se cambia ahí y en la tarjeta de las preguntas frecuentes de la home
(`components/landing/FaqSection.tsx`).

## 2. Dónde aparece

| Página | Píldora | La tarjeta se abre sola |
|---|---|---|
| Home `/` | Sí | Al pasar las preguntas frecuentes (`#preguntas`), que van justo después de los precios |
| `/pricing` | Sí | Al pasar las tarjetas de precios (`#pricing`) |
| `/pagina-web` | Sí | Al pasar los precios de la web (`#website-pricing`) |
| Blog y páginas legales | Sí | Nunca |
| `/vende-mas`, `/visibilidad` (landings de Meta) | No | — |

Las páginas y secciones están en `AUTO_OPEN_AFTER_SECTION`; las landings sin burbuja, en
`HIDDEN_PATHS`.

**Por qué «al pasar» y no «al llegar»:** abierta, la tarjeta ocupa unos 300 × 330 px. Medido el
25-10-2026 con la tarjeta en su sitio y cada sección en pantalla:

| Pantalla | Home, precios | `/pricing`, comparativa | `/pagina-web`, precios |
|---|---|---|---|
| Móvil 390 px | Tapa los precios | Tapa la comparativa | Tapa los precios |
| Ordenador 1280 px | Tapa la tarjeta Free | No tapa | Tapa parte de la tarjeta |
| Ordenador 1536 px | Tapa la tarjeta Free | No tapa | No tapa |

Por eso se abre cuando ya no queda nada de la sección en la zona donde aparecería la tarjeta (abajo,
380 px; `sectionIsPast`): quien ha visto los precios y sigue en la página es quien suele tener
dudas, y la tarjeta queda sobre la sección siguiente. Se mide así, y no con «ha salido de la
pantalla por arriba», porque en `/pagina-web` los precios van justo antes del pie y nunca llegan a
salir por arriba.

## 3. Cuándo no se abre sola

Se comprueba en el momento de abrirla. Si algo lo impide, lo vuelve a intentar con el siguiente
scroll.

- **Ya se abrió en esta visita** (`sessionStorage`, `pu_whatsapp_card_seen`).
- **Ha pulsado un botón de alta** en esta visita: cualquier elemento con
  `data-track-event="sign_up_click"` (`sessionStorage`, `pu_whatsapp_signup_click`).
- **La cerró con la ✕ hace menos de 7 días** (`localStorage`, `pu_whatsapp_card_closed_at`).
- **Ya escribió por WhatsApp** desde la píldora o la tarjeta: no se vuelve a abrir sola nunca
  (`localStorage`, `pu_whatsapp_contacted`).
- **Está ocupado:** el Advisor (`#advisor`) se ve en pantalla, o está escribiendo en un campo
  (`input`, `textarea`, `select`). La lista está en `BUSY_SECTIONS`.
- **Hay un botón de alta donde quedaría la tarjeta:** cualquier elemento con
  `data-track-event="sign_up_click"` dentro de la zona de abajo a la derecha que ocupa la tarjeta
  (340 × 380 px, `CARD_ZONE`) o en los 400 px siguientes por debajo de la pantalla, para que no se
  abra justo antes de que el botón suba hasta ella. En `/pricing`, justo después de los precios viene
  «Crear carta gratis»: sin esta regla, en móvil la tarjeta lo tapaba (visto el 25-10-2026). La
  tarjeta espera a que el botón pase.

Ninguna de estas claves guarda datos personales. Si el navegador bloquea el almacenamiento, la
tarjeta puede volver a salir, pero nada se rompe.

## 4. Cuándo se cierra sola

Vuelve a ser píldora, sin contar como cerrada con la ✕ (no activa los 7 días), cuando:

- el visitante hace más de 400 px de scroll sin tocarla (`AUTO_CLOSE_SCROLL_PX`);
- un botón de alta entra en la zona que ocupa la tarjeta: nunca tapa el objetivo principal.

## 5. Mensaje ya escrito

El enlace abre WhatsApp con un texto según la página, para saber desde dónde escribe cada lead:

- `/pricing`: «Hola, estoy viendo los precios de PowerUp Menu y tengo una duda»
- `/pagina-web`: «Hola, me interesa la página web de PowerUp Menu»
- blog: «Hola, estaba leyendo el blog de PowerUp Menu y tengo una pregunta»
- resto: «Hola, tengo una pregunta sobre PowerUp Menu» (`COMPANY.whatsappUrl`)

## 6. Medición

Los dos enlaces mandan el `outbound_click` de siempre con `label: whatsapp`. Se distinguen por
`location`:

- `burbuja`: la píldora;
- `burbuja_tarjeta`: el botón «Escribir a Fede» de la tarjeta.

Comparar los dos dice si abrir la tarjeta sola aporta clics. No hace falta tocar GTM. Más detalle
en `docs/medicion/README.md`.

## 7. Rendimiento y privacidad

- Es un enlace `wa.me`: sin scripts de terceros ni cookies.
- `motion` ya lo carga la web (el menú lo usa), así que la animación no añade peso.
- Por encima de la burbuja quedan el banner de cookies y los avisos de error del Advisor.
