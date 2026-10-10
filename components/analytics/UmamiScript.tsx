// Umami no usa cookies ni guarda datos personales, así que se carga sin pasar por el banner,
// como Vercel Analytics. Va en el HTML del servidor para que ya esté en la página cuando GTM se
// monta: la etiqueta «Umami tracking code» de GTM comprueba si existe y, si existe, no carga otra
// copia (si no, quien acepta la analítica contaría doble). Ver docs/medicion/README.md.
// data-domains: solo cuenta en producción, no en local ni en el dominio de Vercel.
export const UMAMI_SRC = "https://umami.powerup.menu/script.js";
export const UMAMI_WEBSITE_ID = "ff12504c-d577-4856-8279-0d84ba8d3856";

export function UmamiScript() {
  return (
    <script
      defer
      src={UMAMI_SRC}
      data-website-id={UMAMI_WEBSITE_ID}
      data-domains="www.powerup.menu"
    />
  );
}
