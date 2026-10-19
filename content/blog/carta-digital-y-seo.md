---
# Nuevo (plan orgánico LLM, B7, miniplan aprobado el 19-10-2026). Índice sacado de las consultas reales de Search Console (rutina-blog/2026-10-19-search-console.md): «carta google» 21, «google carta» 15, «carta digital online» 28, «ficha de google salir en la ia» 1. Fuentes verificadas el 19-10-2026 (analisis-chatgpt-competidores-datos/fuentes_b7_2026-10-19.json): Google no tiene resultado enriquecido propio de Menu ni de Restaurant, solo Local business con la propiedad `menu`; no hay fuente oficial de que Google lea el texto de una imagen ni de qué buscador usa ChatGPT, así que no se afirma. Decisión de Fede (19-10): los datos estructurados se explican en general, sin decir nada de las cartas de PowerUp (la comprobación A.5 del 04-10 dice que no los tienen). De PowerUp: lib/llms.ts, components/landing/section-data.ts y /pricing; la sincronización diaria con la ficha y la dirección propia de la carta, como en carta-en-google-maps (Fede, 25-09). Revisado y firmado por Fede (19-10-2026).
title: "Carta digital y SEO: cómo hacer que Google y ChatGPT lean tu carta"
slug: "carta-digital-y-seo"
seo_title: "Carta digital y SEO: que Google y ChatGPT la lean (2026)"
seo_description: "Qué necesita la carta de tu restaurante para que Google y ChatGPT la encuentren y la entiendan: texto en una web, ficha de Google, datos estructurados y más."
excerpt: "Cada vez más clientes eligen restaurante preguntando a Google o a ChatGPT. Qué necesita tu carta para que la lean: texto en una página propia, la ficha de Google al día y unos pocos ajustes."
cluster: "carta-digital"
keyword_principal: "carta digital y SEO"
content_strategy: "llm-first"
destino_comercial: "powerup"
cta: "medium"
fecha_publicacion: 2026-10-19
fecha_modificacion: 2026-10-19
autor: "powerup-menu"
draft: false
revisado_por: "federico-bello"
image: "/blog/portadas/carta-digital-y-seo.svg"
image_alt: "Ilustración: un buscador con varios resultados, el primero destacado en azul, que es la carta digital de un restaurante."
respuesta_corta: "Google y ChatGPT solo pueden usar tu carta si la encuentran y la pueden leer. Para eso, la carta tiene que estar como texto en una página web pública con su propia dirección, enlazada desde tu web y desde tu ficha de Google, y la sección «Menú» de la ficha tiene que estar al día. Una carta que solo existe en papel, en una foto o en un PDF suelto se lee peor. Los datos estructurados ayudan a explicar quién eres, pero Google no tiene un resultado especial para las cartas, y ChatGPT solo muestra en su búsqueda las webs que dejan pasar a su rastreador."
puntos_clave:
  - "Google indexa páginas web y también archivos PDF, pero una carta en texto, en una página adaptada al móvil, es lo más fácil de leer y de mantener."
  - "La ficha de Google tiene una sección «Menú». Google puede sacarla de su editor, de tu web, de una foto o un PDF, y los cambios tardan entre 24 y 48 horas en verse."
  - "Google no tiene un resultado enriquecido propio para las cartas. Los datos estructurados de negocio local admiten la dirección de la carta, pero Google no garantiza que se muestren."
  - "ChatGPT muestra en su búsqueda las webs que permiten pasar a su rastreador, OAI-SearchBot. Las que lo bloquean no salen en sus respuestas, como mucho como un simple enlace."
  - "El mismo nombre, la misma dirección y los mismos platos en tu web, tu ficha y tu carta ayudan a que buscadores e IA entiendan que hablan del mismo restaurante."
faq:
  - pregunta: "¿Qué es la carta de Google?"
    respuesta: "Es la sección «Menú» de tu ficha de Google, la que sale al buscar tu restaurante en Google o en Google Maps. Enseña tus platos y precios. Google puede sacarla del editor de la ficha, de tu web, de una foto o un PDF de la carta, de un proveedor externo o de las fotos que suben los clientes."
  - pregunta: "¿Google lee una carta en PDF?"
    respuesta: "Google puede indexar archivos PDF. Pero un PDF se pensó para imprimir: en el móvil hay que ampliarlo, y cada cambio obliga a rehacer el archivo. Si el PDF es una foto escaneada, Google no explica en su documentación que lea el texto que hay dentro de una imagen. Una carta en texto, en una página web, es lo más seguro."
  - pregunta: "¿Cómo salgo en Google Maps con mi carta?"
    respuesta: "Desde tu Perfil de Empresa en Google, en «Editar menú», puedes escribir la carta o elegir de dónde la saca Google. Pon también la dirección de tu carta digital en el campo del enlace al menú. Los cambios tardan entre 24 y 48 horas en verse en Maps y en la Búsqueda."
  - pregunta: "¿Cómo hago que ChatGPT recomiende mi restaurante?"
    respuesta: "Nadie puede garantizarlo. Lo que sí está en tu mano es que ChatGPT pueda leerte: que tu web y tu carta sean públicas y estén en texto, que tu archivo robots.txt deje pasar a OAI-SearchBot, el rastreador que usa su búsqueda, y que tu información sea la misma en todas partes. Las reseñas y las comparativas en las que apareces también cuentan."
  - pregunta: "¿Una carta digital online ayuda al SEO del restaurante?"
    respuesta: "Ayuda si está en una página pública con su propia dirección, en texto y no en imagen, y enlazada desde tu web y tu ficha de Google. Así, quien busca un plato o tu nombre puede encontrar la carta, y la ficha puede mostrarla."
  - pregunta: "¿Necesito datos estructurados en la carta?"
    respuesta: "No son imprescindibles. Google no tiene un resultado enriquecido propio para las cartas, aunque los datos estructurados de negocio local admiten la dirección de la carta. Google avisa de que no garantiza que se muestren. Antes, asegúrate de lo básico: carta en texto, ficha al día y la misma información en todas partes."
fuentes:
  - titulo: "Google Search Central: tipos de archivo que Google puede indexar"
    url: "https://developers.google.com/search/docs/crawling-indexing/indexable-file-types"
  - titulo: "Google Search Central: guía de introducción al SEO"
    url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide"
  - titulo: "Google Search Central: datos estructurados de negocio local"
    url: "https://developers.google.com/search/docs/appearance/structured-data/local-business"
  - titulo: "Ayuda de Perfil de Empresa en Google: Acerca del editor de menú"
    url: "https://support.google.com/business/answer/9455840?hl=es"
  - titulo: "OpenAI: rastreadores y OAI-SearchBot"
    url: "https://developers.openai.com/api/docs/bots"
  - titulo: "PowerUp Menu: precios"
    url: "https://www.powerup.menu/pricing"
---

Cada vez más gente elige dónde comer buscando en Google o preguntando a una IA como ChatGPT. Para que tu restaurante aparezca con su carta, esos sistemas tienen que poder encontrarla y leerla. En este artículo explicamos cómo lo hacen y qué puedes hacer tú, sin tecnicismos.

## Cómo leen Google y ChatGPT la carta de un restaurante

Los dos funcionan parecido:

1. **Rastrean.** Un programa visita las páginas públicas de internet y sigue sus enlaces. Si tu carta no está en ninguna página o nadie la enlaza, no la encuentra.
2. **Leen el texto.** De cada página guardan sobre todo el texto: el nombre del restaurante, los platos, los precios. Lo que solo está dibujado en una imagen es más difícil de entender.
3. **Juntan fuentes.** Tu web, tu ficha de Google, las reseñas y las páginas que hablan de ti. Cuanto más coincidan, más claro les queda quién eres y qué ofreces.

En Google, además, la ficha de tu restaurante tiene su propia sección «Menú», que se ve en la Búsqueda y en Google Maps.

## PDF, foto o página web: qué se lee mejor

| Formato | ¿Lo puede leer un buscador? | En el móvil | Cambiar un precio |
|---|---|---|---|
| Foto de la carta | Google no explica que lea el texto de una imagen | Hay que ampliar | Sacar otra foto |
| PDF | Google indexa archivos PDF | Hay que ampliar | Rehacer el archivo |
| Carta digital en una página web | Sí: es texto en una página | Adaptada a la pantalla | Al momento |

Google indexa archivos PDF, pero un PDF se pensó para imprimir, y si es un escaneo, el texto está dentro de una imagen. La guía de introducción al SEO de Google insiste en dar a los buscadores texto, también alrededor de las imágenes, para que entiendan de qué tratan. Lo comparamos a fondo en [carta digital o carta en PDF](/blog/carta-restaurante).

## La carta en tu ficha de Google

Cuando alguien busca «carta» y el nombre de tu restaurante, lo primero que suele ver es tu ficha de Google. Su sección «Menú» puede salir de cinco sitios: lo que escribes en el editor de la ficha, una foto o un PDF de la carta, tu web, un proveedor externo o las fotos que suben los clientes. Si hay varias fuentes, eliges cuál se muestra.

Tres cosas que conviene hacer:

- **Elige la fuente buena** en «Editar menú» y revísala cada vez que cambies la carta. Según Google, los cambios tardan entre 24 y 48 horas en verse en Maps y en la Búsqueda.
- **Pon la dirección de tu carta digital en el enlace al menú**, en la información de contacto de la ficha.
- **Pide a Google que retire las fotos antiguas de la carta** que hayan subido clientes, si enseñan precios que ya no tienes, y sube una actual.

Lo explicamos paso a paso en [cómo poner la carta en Google Maps](/blog/carta-en-google-maps).

## La carta en tu web

- **Enlázala desde tu web,** a poder ser desde el menú principal, con un texto claro como «Carta».
- **Usa el nombre del restaurante en el título de la página** de la carta, como en la ficha.
- **Mantén la misma información en todas partes:** nombre, dirección, horarios y platos. Si tu web dice una cosa y tu ficha otra, confundes a los clientes y a los buscadores.
- **Que sea pública:** si para ver la carta hace falta iniciar sesión o descargar algo, los buscadores no la leen.

## Los datos estructurados

Los datos estructurados son un bloque de código invisible para el cliente que le explica al buscador quién eres: nombre, dirección, horario, tipo de cocina, la dirección de tu carta. Siguen un vocabulario común, schema.org.

Lo que dice Google:

- **No hay un resultado enriquecido propio para las cartas** ni para los restaurantes. Sí documenta los datos estructurados de negocio local, que admiten la dirección de la carta.
- **El carrusel de restaurantes** está limitado, según Google, a un pequeño grupo de proveedores.
- **No hay garantías:** Google avisa de que no garantiza que las funciones que usan datos estructurados aparezcan en los resultados.

Ayudan, pero no son lo primero. Antes, asegúrate de que la carta está en texto, la ficha está al día y la información coincide en todas partes.

## ChatGPT y otras IA

Cuando alguien le pregunta a ChatGPT dónde comer, puede buscar en internet y resumir lo que encuentra: webs de restaurantes, fichas, reseñas y comparativas.

- **Deja pasar a su rastreador.** OpenAI explica que su búsqueda usa un rastreador llamado OAI-SearchBot y que las webs que lo bloquean en su archivo robots.txt no aparecen en sus respuestas, como mucho como un simple enlace. Recomienda permitirlo, y los cambios tardan unas 24 horas en aplicarse. Es distinto de GPTBot, el que se usa para entrenar sus modelos.
- **Dale texto que pueda citar:** platos, precios, horarios, si tienes menú del día o carta en otros idiomas.
- **Cuida las reseñas.** Los clientes las leen antes de elegir, y forman parte de lo que una IA puede encontrar sobre ti.

Nadie puede garantizar que una IA te recomiende. Lo que sí está en tu mano es que pueda leerte.

## Checklist

- La carta está en texto, en una página pública con su propia dirección.
- La página de la carta se ve bien en el móvil.
- Tu web enlaza a la carta.
- La sección «Menú» de tu ficha de Google sale de la fuente buena y está al día.
- El enlace al menú de la ficha lleva a tu carta digital.
- Nombre, dirección, horarios y platos coinciden en la web, la ficha y la carta.
- Has pedido que se retiren de la ficha las fotos antiguas de la carta con precios que ya no tienes.
- Tu robots.txt deja pasar a Googlebot y a OAI-SearchBot.
- Revisas la carta y la ficha cada vez que cambias un plato o un precio.

## Cómo ayuda PowerUp Menu

PowerUp Menu es una carta digital pensada para vender más dentro del restaurante y para que te encuentren fuera, en Google y en las IA que la gente usa para decidir dónde comer.

- **Tu carta tiene su propia dirección,** con cualquier plan, también con el gratis. Puedes enlazarla desde tu web y ponerla como enlace al menú de tu ficha.
- **Google Maps:** en el plan Pro, la carta se sincroniza con tu ficha: cada día se actualiza la sección «Menú» con lo que tienes en la carta digital.
- **Idiomas:** traducción automática con IA, hasta 3 idiomas en el plan gratis e ilimitados en el Pro.
- **Web:** el plan Pro con pago anual incluye una web para tu restaurante.

PowerUp Menu no gestiona pedidos ni pagos: el pedido lo sigue tomando el camarero. Para empezar con la carta digital, en la [guía de la carta digital con QR](/blog/carta-digital-con-qr) explicamos cómo hacerla paso a paso, y si estás eligiendo herramienta, comparamos las opciones en [las mejores cartas digitales QR en España](/blog/mejores-cartas-digitales-qr). Qué más puedes digitalizar lo contamos en [digitalización de restaurantes](/blog/digitalizacion-de-restaurantes).
