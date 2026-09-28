# Guía de imágenes del blog

Para quien prepare un post, persona o Claude. Recoge cómo se hicieron las portadas y las figuras
de septiembre de 2026 y las reglas que aprobó Fede. Esta carpeta no es contenido: el blog solo lee
los `.md` que están directamente en `content/blog/` y los de `content/blog/temas/`.

## Qué imagen usar

Todos los posts llevan portada. Dentro del texto, para cada figura, en este orden:

1. **¿Ayuda a entender algo concreto del texto?** Si no, no va.
2. **Si hay que enseñar el producto, se usa una imagen real de la web; no se genera.**
   - Están en `public/images/` del repo, como `features/features-bento-N` (la sección de funciones
     de la home), los widgets y los pasos de «cómo funciona». El export del diseño las trae en
     `assets/`.
   - Se copian a `public/blog/` en vez de enlazarlas: así un cambio en la web no rompe el blog.
   - **Las versiones `@2x` de `public/images/features/` están mal exportadas:** el negro se
     convirtió en transparencia, así que las letras salen huecas y la franja negra de una bandera,
     vacía. Antes de usarlas se pasan por `lib/blog/scripts/restaurar-negro.mts`. Las `@1x` están
     bien, pero son pequeñas. Para comprobar una imagen, se pone sobre un fondo magenta: si se ha
     perdido el negro, los huecos se ven rosas.
   - La imagen de idiomas (`features-bento-1`) pone «Deutch»; en la copia del blog está corregido a
     «Deutsch».
   - Fuera: las que llevan cifras que el blog no puede respaldar (como «Ticket medio +27 %») y
     todo lo que sugiera que PowerUp Menu gestiona pedidos o pagos. El pedido lo toma el camarero.
3. **Si son datos o un proceso del post, se dibuja una figura propia en SVG**, con los números
   del propio texto y ninguno más:
   - un gráfico (popularidad y margen);
   - un cálculo paso a paso (del precio al margen);
   - un esquema (el organigrama);
   - una comparación (4,99 € frente a 5 €).

   El pie dice de dónde salen los datos.
4. **Si es un cliente real**, vale el material que la web ya usa (su logo, la foto del local, las
   grabaciones de cartas de la home, en `public/videos/cartas-demo/`) y capturas de su carta
   pública. Fede dio el OK el 25-09-2026: los clientes lo ven bien. Condiciones:
   - solo clientes actuales: si uno deja PowerUp Menu, su imagen se quita;
   - siempre en un contexto amable: nunca como ejemplo de lo que se hace mal;
   - la fecha en el pie («Captura de septiembre de 2026»), porque los platos y los precios
     cambian;
   - sin personas reconocibles ni nada privado (teléfonos, la clave del wifi, fotos del equipo);
   - sin anuncios ni avisos de cookies encima.
5. **La portada:** la imagen del producto si el post trata de la carta; el material del cliente si
   es un caso; si no, una versión simplificada de la figura principal o una escena sencilla (el
   QR que lleva al móvil).

**Nunca:** fotos de stock o generadas con IA (una foto generada de un plato o de un local puede
pasar por real), capturas con datos inventados, personas o testimonios inventados, ni imágenes
del blog viejo.

En los posts que se mantienen del blog viejo, una figura solo entra si enseña lo que el texto ya
dice, sin cambiar ninguna palabra.

## Estilo

- Colores del sistema de diseño (`tokens.css`): azul #3482AA, verde #50B27F, naranja #FF9800;
  texto #0F172A, #334155 y #475569; bordes #E2E8F0.
- Fondo pastel según el tema del post:

  | Tema | Color |
  |---|---|
  | Ingeniería de menú | #FFEBAB |
  | Rentabilidad y costes | #DFFFEA |
  | Psicología y precios | #F8F0FF |
  | Carta digital | #DEF8FF |
  | Casos prácticos | #CEEDB8 |
  | Sin tema | #F1F5F9 |

- Portadas: tarjeta blanca de 400×300 con esquinas de radio 24 y el resto transparente. La
  interfaz se insinúa con barras grises en vez de textos y precios inventados.
- Figuras: 560 de ancho y etiquetas de 16 a 18 px, para que se lean en el móvil.
- Imágenes del producto: sobre el pastel del tema, con una sombra suave (ver
  `maridaje-recomendado.svg`). Las pantallas de clientes, dentro de un móvil de borde oscuro, de
  dos en dos (ver `figuras/la-taberna-marisa/carta-digital.jpg`).
- Fuente: `Inter, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`. Un
  SVG metido como `<img>` no carga las fuentes de la web: si el dispositivo no tiene Inter, usa la
  del sistema. Tampoco carga otros archivos: una imagen dentro de un SVG va en base64.
- Peso: los SVG, por debajo de 50 KB. Lo que lleve fotos o capturas va en JPEG, hasta unos
  130 KB.

## Dónde van y cómo se escriben

- Portadas: `public/blog/portadas/<slug>.svg|jpg|png`, en el frontmatter con `image` e
  `image_alt`.
- Figuras: `public/blog/figuras/<slug>/<nombre>`, dentro del Markdown como HTML, sin líneas en
  blanco dentro:

  ```html
  <figure>
  <img src="/blog/figuras/<slug>/<nombre>.svg" width="560" height="380" alt="Qué muestra y qué conclusión saca.">
  <figcaption>De dónde salen los datos.</figcaption>
  </figure>
  ```

- Cada `<img>` lleva `width`, `height` y `alt`, y el archivo tiene que existir. Si no, la
  compilación estricta falla, y en producción la imagen se omite con un aviso. Lo comprueba
  `lib/blog/images.ts`.
- El texto alternativo dice qué muestra la imagen y qué conclusión saca, no solo su título.
- La imagen para buscadores y redes (el JSON-LD y `og:image`) es siempre el PNG de 1200×630 que
  se genera solo. La portada no la sustituye.

## Herramientas en el Mac de Fede

- Vista previa o render de un SVG: `qlmanage -t -s <px> -o <carpeta> <archivo>.svg`. Con un SVG
  que no es cuadrado, coloca mal la imagen: se renderiza en un lienzo cuadrado con la figura
  centrada y luego se recorta.
- `sips` pasa a JPEG (`sips -s format jpeg -s formatOptions 72`) pero no escribe WebP, y **ignora
  `--cropOffset`**: recorta siempre desde el centro. Para un recorte exacto, se recorta dentro
  del SVG (con `clipPath`).
- Fotogramas de un vídeo local: un script de Swift con `AVAssetImageGenerator`. No hay `ffmpeg`.
- Capturas de una carta: Chrome sin interfaz con un perfil temporal (`--headless=new
  --user-data-dir=<carpeta temporal>`), nunca el perfil de Fede. No baja de unos 500 px de ancho:
  con menos, la página se corta a la derecha. Se captura a 500×1080 con
  `--force-device-scale-factor=2`. A veces no se cierra solo después de guardar la captura: se
  cierra el proceso de ese perfil temporal.
- Abrir la carta de un cliente puede sumar alguna visita a sus estadísticas: las justas.

## Comprobar

- La compilación estricta del blog: `env -u VERCEL_ENV npx next build --debug-build-paths
  "app/blog/**,app/llms.txt/**"`.
- La revisión en local, también con el ancho de un móvil.
