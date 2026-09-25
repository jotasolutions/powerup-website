# Migración de color a tokens (`chore/color-tokens`)

Refactor **sin cambio visual**. `app/globals.css` pasa a ser la única fuente de
verdad de color de marca: los tokens `--pm-*` viven en `:root` y se exponen vía
`@theme inline` como utilidades Tailwind (`bg-pm-pastel-cyan`, `text-pm-green`,
`stroke-pm-yellow`, `from-pm-stroke-mint`, …).

- Base: `origin/main` @ `7d5a78e`.
- Hex en `app/` + `components/` (tsx/ts/css): **77 → 41** ocurrencias
  (los 14 hex de `globals.css` son las definiciones de los tokens).
- ΔE = distancia euclídea en OKLab (L, a, b) al token más cercano **del mismo rol**.

## Tokens añadidos (`app/globals.css`)

| Rol | Token | Valor |
|---|---|---|
| Acento | `--pm-orange` | `#FF9800` |
| Acento | `--pm-yellow` | `#FFCD45` |
| Acento | `--pm-green` | `#50B27F` |
| Acento | `--pm-orange-ink` | `#C45C2A` |
| Acento | `--pm-amber-ink` | `#C89746` |
| Relleno | `--pm-pastel-mint` | `#DFFFEA` |
| Relleno | `--pm-pastel-lime` | `#CEEDB8` |
| Relleno | `--pm-pastel-amber` | `#FFEBAB` |
| Relleno | `--pm-pastel-cyan` | `#E2FEFD` |
| Relleno | `--pm-pastel-blue` | `#DEF8FF` |
| Relleno | `--pm-pastel-purple` | `#F8F0FF` |
| Trazo/borde | `--pm-stroke-mint` | `#92E0B8` |
| Trazo/borde | `--pm-stroke-peach` | `#FBBD8A` |
| Logo | `--pm-logo-blue` | `#154F62` |

Alias deprecados (nombres §6-BIS, sin utilidad Tailwind):
`--pm-pastel-mint-border → var(--pm-stroke-mint)`,
`--pm-pastel-peach → var(--pm-stroke-peach)`.

## Hex migrados

Todos con ΔE = 0 (coincidencia exacta). 36 ocurrencias.

| Hex | Token / utilidad | ΔE | Archivos |
|---|---|---|---|
| `#FF9800` | `Highlighter color="var(--pm-orange)"` | 0 | `landing/HeroSection.tsx:104`, `landing/PricingSection.tsx:32`, `landing/TestimonialsSection.tsx:64`, `landing/website/WebsitePricingSection.tsx:72` |
| `#FFCD45` | `stroke-pm-yellow` (atributo SVG → clase) | 0 | `landing/website/WebsiteOutstandSection.tsx:26,34`, `ui/smoothui/scroll-reveal-paragraph/index.tsx:118,126` |
| `#50B27F` | `text-pm-green` | 0 | `landing/TestimonialsSection.tsx:26,36,46,65` |
| `#C45C2A` | `text-pm-orange-ink` | 0 | `landing/DifferentiationSection.tsx:88` |
| `#C89746` | `text-pm-amber-ink` | 0 | `landing/DifferentiationSection.tsx:121` |
| `#DFFFEA` | `from-pm-pastel-mint` | 0 | `landing/PricingCards.tsx:101`, `landing/website/WebsitePricingSection.tsx:82` |
| `#CEEDB8` | `bg-pm-pastel-lime` | 0 | `landing/PricingCards.tsx:137,220`, `landing/website/WebsitePricingSection.tsx:108` |
| `#FFEBAB` | `bg-pm-pastel-amber` | 0 | `landing/PricingCards.tsx:170`, `landing/website/WebsitePricingSection.tsx:127` |
| `#E2FEFD` | `bg-/from-/via-pm-pastel-cyan` | 0 | `app/pagina-web/page.tsx:38`, `landing/AdminSection.tsx:15`, `landing/MenuShowcaseSection.tsx:58`, `landing/PricingSection.tsx:21`, `landing/website/WebsiteHeroSection.tsx:19`, `landing/website/WebsitePricingSection.tsx:62`, `landing/website/WebsiteShowcaseSection.tsx:10` |
| `#DEF8FF` | `to-/via-pm-pastel-blue` | 0 | `landing/FooterSection.tsx:10` (×2), `landing/website/WebsiteFinalCtaSection.tsx:11` |
| `#F8F0FF` | `from-pm-pastel-purple` | 0 | `landing/AnalyticsSection.tsx:63` |
| `#92E0B8` | `from-pm-stroke-mint` (borde degradado de 3px de la card Pro) | 0 | `landing/PricingCards.tsx:100`, `landing/website/WebsitePricingSection.tsx:81` |
| `#FBBD8A` | `text-pm-stroke-peach` (trazo del icono Globe) | 0 | `landing/PricingCards.tsx:171`, `landing/website/WebsitePricingSection.tsx:128` |

Nota técnica: `rough-notation` escribe el color en el atributo SVG `stroke`,
donde `var()` no se resuelve de forma fiable. `components/ui/highlighter.tsx`
resuelve ahora `var(--x)` a su valor computado antes de pasarlo a la librería.

## Hex NO migrados

### ΔE ≤ 0.02 pero revertidos o retenidos (decisión a revisar)

| Hex | Token más cercano (rol) | ΔE | Archivo | Motivo |
|---|---|---|---|---|
| `#E2FEE2` | `--pm-pastel-mint` (relleno) | 0.0101 | `landing/AdvisorSection.tsx:34` | Migrado y **revertido**: diferencia visible en la comparación antes/después (la parada inferior pasa de lima a menta). |
| `#ECF8FF` | `--pm-pastel-blue` (relleno) | 0.0175 | `landing/SellMoreSection.tsx:63` (×3 cards en home) | Migrado y **revertido**: diferencia visible (la parte superior de la card se vuelve más azul). |
| `#EFF6FF` | `--pm-pastel-purple` (relleno) | 0.0184 | `landing/FeaturesSection.tsx:38` | **Retenido**: es Tailwind `blue-50`; mapearlo a un token *purple* acoplaría un azul a la escala lila. Los dos casos anteriores del mismo rango resultaron visibles. |

> Conclusión: con pasteles claros en degradado y comparación lado a lado, el
> umbral ΔE ≤ 0.02 **no** es imperceptible. Recomendación: umbral ≤ 0.005 o
> solo coincidencias exactas.

### ΔE > 0.02 — relleno

| Hex | Token más cercano | ΔE | Archivos |
|---|---|---|---|
| `#F0FFF5` | `--pm-pastel-cyan` | 0.0202 | `landing/AttractPeopleSection.tsx:62` |
| `#EFF9FF` | `--pm-pastel-cyan` | 0.0206 | `landing/DifferentiationSection.tsx:18` |
| `#F4F4F4` | `--pm-pastel-purple` | 0.0216 | `landing/website/WebsiteShowcaseSection.tsx:19` (gris neutro, sin token) |
| `#F0FEE2` | `--pm-pastel-mint` | 0.0217 | `landing/AdvisorSection.tsx:34` |
| `#F7F7F9` | `--pm-pastel-purple` | 0.0221 | `landing/FeaturesSection.tsx:38` (gris neutro) |
| `#F7F7F7` | `--pm-pastel-purple` | 0.0240 | `landing/website/WebsitePainPointSection.tsx:26,34,42,50`, `landing/website/WebsiteSplitSection.tsx:51` (gris neutro) |
| `#D2EFFF` | `--pm-pastel-blue` | 0.0292 | `landing/HowItWorksSection.tsx:53` (`stopColor`) |
| `#FFE6BE` | `--pm-pastel-amber` | 0.0306 | `landing/DifferentiationSection.tsx:121` |
| `#D7EEEE` | `--pm-pastel-blue` | 0.0317 | `ui/animated-tabs.tsx:72` |
| `#CBFFDC` | `--pm-pastel-mint` | 0.0320 | `landing/AttractPeopleSection.tsx:62` |
| `#C5F5F7` | `--pm-pastel-blue` | 0.0338 | `landing/section-data.ts:127` |
| `#FFFFFF` | `--pm-pastel-cyan` | 0.0373 | `landing/PricingCards.tsx:101`, `landing/website/WebsitePricingSection.tsx:82` (`via-[#ffffff]`), `landing/ExampleMenuQr.tsx:19` (prop `color` del QR). Blanco neutro, sin token. |
| `#ECDFF7` | `--pm-pastel-purple` | 0.0465 | `landing/AnalyticsSection.tsx:63` |
| `#BBF9F0` | `--pm-pastel-mint` | 0.0467 | `landing/HowItWorksSection.tsx:54` (`stopColor`) |
| `#BCF5EE` | `--pm-pastel-blue` | 0.0488 | `landing/section-data.ts:135` |
| `#C6E9FC` | `--pm-pastel-blue` | 0.0511 | `landing/section-data.ts:119` |
| `#C1EAFF` | `--pm-pastel-blue` | 0.0536 | `landing/SellMoreSection.tsx:63` |
| `#25946F` | `--pm-pastel-lime` (relleno) · `--pm-green` como acento: 0.0962 | 0.3204 | `AdvisorWidget.tsx:173,263` (fondo sólido de botón; verde CTA/semántico, no verde de marca) |

### ΔE > 0.02 — trazo/borde

| Hex | Token más cercano | ΔE | Archivos | Nota |
|---|---|---|---|---|
| `#D0F6EA` | `--pm-stroke-mint` | 0.1124 | `landing/AdvisorSection.tsx:34` | a 0.031 de `--pm-pastel-mint` |
| `#CFF5FF` | `--pm-stroke-mint` | 0.1286 | `landing/FooterSection.tsx:12,20` | a 0.021 de `--pm-pastel-blue` |
| `#FFEFE9` | `--pm-stroke-peach` | 0.1436 | `landing/DifferentiationSection.tsx:88` | |
| `#FFF5E6` | `--pm-stroke-peach` | 0.1511 | `landing/DifferentiationSection.tsx:121` | |
| `#ECF8FE` | `--pm-stroke-mint` | 0.1563 | `landing/section-data.ts:119` | a 0.017 de `--pm-pastel-blue` |
| `#ECFCFC` | `--pm-stroke-mint` | 0.1577 | `landing/section-data.ts:127,135` | a 0.013 de `--pm-pastel-cyan` |

Los bordes claros no encajan en los dos trazos de la escala (que son tonos
medios). Falta un rol de **borde pastel**. Es una decisión de escala, no un
error de mapeo.

### Familia rosa/rojo (sin token, fuera de alcance)

| Hex | Token más cercano (cualquier rol) | ΔE | Archivos |
|---|---|---|---|
| `#FFCCBE` | `--pm-stroke-peach` | 0.0648 | `landing/DifferentiationSection.tsx:88` (`bg`) |
| `#FFD1DC` | `--pm-pastel-purple` | 0.0763 | `ui/highlighter.tsx:34` (color por defecto del Highlighter) |
| `#FFDEDE` | `--pm-pastel-purple` | 0.0515 | `landing/website/WebsitePainPointSection.tsx:11` (`via`) |

## Decisiones abiertas (fuera de alcance, sin tocar)

1. **Modo oscuro**: `.dark` convierte `--primary` en neutro y se pierde el azul de marca.
2. **Banda de pasteles**: igualar luminosidad/croma entre pasteles es un cambio visual; va en una fase aparte.
3. **Nombre del plan gratuito**: Free vs Lite.
4. **`--primary` vs `--pm-logo-blue`**: `oklch(0.576 0.097 234.5)` frente a `#154F62` medido del isotipo. Se documenta, no se unifica.
5. **Umbral ΔE**: ≤ 0.02 resultó visible en pasteles (ver arriba).
6. **Roles que faltan en la escala**: borde pastel, grises neutros (`#F7F7F7`, `#F4F4F4`, `#F7F7F9`), rosa/rojo, verde CTA `#25946F`.
7. **`.design-sync/conventions.md:71`** (se copia al README del bundle) usa el ejemplo `"Agregar al pedido"`, que contradice `product-truth.md` (palabra prohibida: *pedido*). No se ha tocado.

## Verificación

- **Build**: `npm run build` OK. El prerender de `/` y `/pricing` llama a Stripe
  y necesita `STRIPE_SECRET_KEY`, `STRIPE_PRICE_PRO_MONTHLY` y
  `STRIPE_PRICE_PRO_YEARLY`, que no están en el repo. En `main` falla igual sin
  ellas. Para verificar en local se usó un stub temporal de
  `getPricingDataAction` (24,90 € / 269,88 €), aplicado igual antes y después y
  **no commiteado**.
- **Lint**: `npm run lint` sale con 1823 problemas (154 errores) **idénticos en
  `origin/main`**; la mayoría son `ds-bundle/`, `.ds-sync/` (generados) y código
  previo. Los archivos tocados: 0 errores (6 warnings previos de imports sin usar).
- **No regresión**: capturas antes/después (misma base) de `/`, `/pagina-web`,
  `/pricing`, `/privacy` y `/terms`, en desktop 1440 y móvil 390, más un volcado
  de los estilos de color computados de cada elemento (`color`,
  `background-*`, `border-*`, `stroke`, `fill`, `stop-color`):
  - Estado final: **0 diferencias de color computado**. Las únicas diferencias
    son el punto activo del carrusel (también aparece entre dos capturas de la
    misma base), `#FF9800` → `#ff9800` en el atributo del Highlighter (solo
    mayúsculas/minúsculas) y el atributo `stroke` de las flechas amarillas,
    sustituido por una clase con el mismo `stroke` computado.
  - Las diferencias de píxeles restantes están en vídeos y carruseles
    capturados en otro fotograma (revisado a ojo).
  - Los 2 casos con 0 < ΔE ≤ 0.02 sí mostraban diferencia visible y se revirtieron.
- **grep final**: ningún hex migrado queda en los archivos tocados.

## Resync con Claude Design

Procedimiento: `.design-sync/NOTES.md` y la cabecera de `.ds-sync/resync.mjs`.

1. Symlink `node_modules/powerup-menu-website`: hecho.
2. `npx @tailwindcss/cli -i ./app/globals.css -o .design-sync/compiled.css --minify`
   con las fuentes antepuestas: hecho. **Los 14 tokens y los 2 alias aparecen**
   en `compiled.css` y en `ds-bundle/_ds_bundle.css`, junto con las utilidades
   `pm-*` en uso. El minificador pasa los hex a minúsculas, que es equivalente.
3. Ancla remota (`DesignSync get_file _ds_sync.json`): **pendiente**; hace falta
   autorizar con `/design-login`.
4. `node .ds-sync/resync.mjs --config .design-sync/config.json --node-modules ./node_modules --out ./ds-bundle`
   (sin ancla). Veredicto:

   ```json
   { "ok": false, "anchor": "not_provided",
     "stages": { "build": {"ok": true}, "diff": {"ok": true},
                 "validate": {"ok": false, "exit": 1},
                 "capture": {"skipped": "prior_failure"} },
     "upload": { "any": true, "components": 71, "bundle": true, "styling": true, "aux": true } }
   ```

   `validate` falla por un defecto **previo, no causado por este cambio**:
   `components/ui/smoothui/scroll-reveal-paragraph/index.tsx` importa
   `next/image` y el bundle lanza `ReferenceError: process is not defined` al
   cargar, así que los 71 componentes quedan vacíos (`[BUNDLE_EXPORT] 71/71`).
   `componentSrcMap: {ScrollRevealParagraph: null}` no lo evita. Hay una
   corrección ya escrita en la copia zip del repo
   (`.design-sync/overrides/source-kit.mjs` + `libOverrides` en `config.json`)
   que nunca llegó a `main`. No se ha aplicado aquí (cambio de pipeline fuera de
   alcance) y no se ha tocado `lib/emit.mjs` ni `lib/bundle.mjs`.

**No hay subida preparada**: con `validate` en rojo, el bundle no debe subirse.
Los artefactos del resync (`ds-bundle/`, `compiled.css`) no están en este PR.
