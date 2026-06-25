# Design Sync Notes — powerup-menu-website

## Setup quirks
- This is a Next.js marketing website synced as a component library — not a traditional DS package.
- No compiled `dist/` — the converter runs in synth-entry mode, scanning `components/ui/**/*.tsx`.
- Self-referential symlink required: `node_modules/powerup-menu-website -> project root`. This lets the converter resolve `PKG_DIR` correctly. Re-create on fresh clone: `ln -sfn "$(pwd)" node_modules/powerup-menu-website`.
- CSS: Tailwind v4 can't be processed by esbuild natively. A compiled CSS is generated separately: `npx @tailwindcss/cli -i ./app/globals.css -o .design-sync/compiled.css --minify`, then fonts are prepended manually. On re-sync, re-run this command (the compiled.css is gitignored).
- Fonts (Inter, Poppins) loaded via `next/font/google` at runtime by Next.js — a Google Fonts CDN import is prepended to compiled.css as a substitute. `runtimeFontPrefixes: ["Inter", "Poppins"]` suppresses FONT_MISSING warns.
- `ScrollRevealParagraph` (from `components/ui/smoothui/`) excluded: uses `next/image` which can't bundle outside Next.js.

## Render check
- No Playwright installed on first sync. User chose to skip verification entirely (`--no-render-check`).
- Previews were NOT machine-verified. Bundle validated only at structure level.

## Known render warns
_(none yet — render check not run)_

## Re-sync risks
- **Tailwind CSS drift**: The `compiled.css` file captures Tailwind classes used at the time of the sync. If new utility classes are added to `components/ui/`, re-run the `@tailwindcss/cli` command to refresh it, then rebuild.
- **Symlink**: the self-referential `node_modules/powerup-menu-website` symlink is gitignored and must be re-created on a fresh clone.
- **Authored previews**: The 12 authored previews in `.design-sync/previews/` are tied to the component source. If a component's API changes, update its preview accordingly.
- **Font injection**: The Google Fonts URLs are hardcoded in the compiled.css prepend step. If the fonts change, update the prepend step.
- **Dialog/Popover overlays**: Both use Base UI portals. Preview cards have `cardMode: single`. Verify open-state rendering in claude.ai/design after each sync.

## Re-sync command
```bash
# 1. Re-create symlink (if fresh clone)
ln -sfn "$(pwd)" node_modules/powerup-menu-website

# 2. Re-compile Tailwind (if components changed)
npx @tailwindcss/cli -i ./app/globals.css -o .design-sync/compiled.css --minify
# Prepend fonts:
FONTS='@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap");
:root{--font-inter:"Inter",sans-serif;--font-poppins:"Poppins",sans-serif;}'
echo "$FONTS$(cat .design-sync/compiled.css)" > .design-sync/compiled.css

# 3. Re-copy converter scripts and install deps
SKILL_DIR="<path-to-skill>/design-sync"
mkdir -p .ds-sync && cp -r "$SKILL_DIR/"*.mjs "$SKILL_DIR/lib" "$SKILL_DIR/storybook" .ds-sync/
echo '{"name":"ds-sync-deps","private":true}' > .ds-sync/package.json
(cd .ds-sync && npm i esbuild ts-morph @types/react)

# 4. Fetch remote anchor
node .ds-sync/resync.mjs --config .design-sync/config.json --node-modules ./node_modules --out ./ds-bundle --remote .design-sync/.cache/remote-sync.json
```
