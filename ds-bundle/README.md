# PowerUp Menu UI — Design Agent Conventions

## No provider needed

Components require **no context provider**. Import and render directly:

```jsx
import { Button, Card, CardHeader, CardTitle, CardContent } from 'powerup-menu-website';
```

No ThemeProvider, RouterProvider, or wrapper needed at the app root.

## Styling idiom — Tailwind v4 + CSS custom properties

This system uses **Tailwind v4 utility classes** backed by **CSS custom property tokens**. New layout glue (wrappers, spacing, flex/grid) should use Tailwind utilities; never raw inline `color` or `background` values — use the token class equivalents instead.

**Color tokens (via Tailwind utilities):**

| Semantic role | Background class | Text class | CSS var |
|---|---|---|---|
| Primary (brand blue) | `bg-primary` | `text-primary` | `var(--primary)` |
| Primary foreground | `bg-primary-foreground` | `text-primary-foreground` | |
| Secondary | `bg-secondary` | `text-secondary` | |
| Muted | `bg-muted` | `text-muted-foreground` | |
| Accent | `bg-accent` | `text-accent-foreground` | |
| Destructive (red) | `bg-destructive` | `text-destructive` | |
| Card surface | `bg-card` | `text-card-foreground` | |
| Page background | `bg-background` | `text-foreground` | |
| Border | `border-border` | — | `var(--border)` |

**Radius scale:**

| Class | Value |
|---|---|
| `rounded-sm` | `calc(var(--radius) * 0.6)` |
| `rounded-md` | `calc(var(--radius) * 0.8)` |
| `rounded-lg` / `rounded-xl` | `var(--radius)` / `× 1.4` |

**Typography:**

- Body copy: `font-sans` (Inter) — default on `<body>`
- Headings: `font-heading` (Poppins) — use `font-heading` class for titles
- Sizes: standard Tailwind scale (`text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-4xl`)

## Where the truth lives

- **Stylesheet**: `_ds/<folder>/styles.css` and its `@import` — includes compiled Tailwind utilities and CSS custom property tokens. Read before styling.
- **Per-component usage**: each `<Name>.prompt.md` — describes the component's props and composition patterns.
- **Type contracts**: each `<Name>.d.ts` — the exported `<Name>Props` interface.

## Idiomatic build snippet

```jsx
// A menu item card using the design system's own components and styling idiom
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from 'powerup-menu-website';
import { Button } from 'powerup-menu-website';

export function MenuItemCard({ name, description, price }) {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-heading font-semibold text-foreground">
          €{price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Agregar al pedido</Button>
      </CardFooter>
    </Card>
  );
}
```

## Button variants

`variant`: `default` (brand gradient) | `outline` | `ghost` | `secondary` | `destructive` | `success` | `whatsapp` | `inverted` | `link`  
`size`: `xs` | `sm` | `default` | `lg` | `icon`  
`isLoading`: shows animated loader, disables the button

# PowerUpMenuDS (powerup-menu-website@0.1.0)

This design system is the published powerup-menu-website React library, bundled as a single
browser global. All 70 components are the real upstream code.

## Where things are

- `_ds_bundle.js` — the whole-DS bundle at the project root; loads every component to `window.PowerUpMenuDS`. First line is a `/* @ds-bundle: … */` metadata header.
- `styles.css` — the single stylesheet entry: it `@import`s the tokens, fonts, and component styles (`_ds_bundle.css`). Link this one file.
- `components/<group>/<Name>/<Name>.prompt.md` (example JSX + variants), `<Name>.d.ts` (types), `<Name>.html` (variant grid).
- `tokens/*.css` — CSS custom properties, names verbatim from upstream.
- `fonts/` — `@font-face` files + `fonts.css` (when the package ships fonts).

For a specific component, `read_file("components/<group>/<Name>/<Name>.prompt.md")`.

## Loading

Add these two lines to your page once (React must be on the page first):

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
```

Components are then available at `window.PowerUpMenuDS.*`. Mount into a dedicated child node (e.g. `<div id="ds-root">`), not the host page's own React root, so the two trees don't collide:

```jsx
const { Accordion } = window.PowerUpMenuDS;
ReactDOM.createRoot(document.getElementById('ds-root')).render(<Accordion />);
```

## Tokens

215 CSS custom properties from powerup-menu-website. Names are
preserved verbatim from upstream. They are declared inside `_ds_bundle.css` (this DS ships one compiled stylesheet rather than separate token files).

- **color** (60): `--tw-border-style`, `--tw-shadow-color`, `--tw-inset-shadow-color`, …
- **spacing** (6): `--tw-space-y-reverse`, `--tw-space-x-reverse`, `--tw-inset-shadow`, …
- **typography** (13): `--font-inter`, `--font-poppins`, `--tw-font-weight`, …
- **radius** (3): `--radius-sm`, `--radius-md`, `--radius`
- **shadow** (9): `--tw-shadow`, `--tw-shadow-alpha`, `--tw-ring-shadow`, …
- **other** (124): `--tw-translate-x`, `--tw-translate-y`, `--tw-translate-z`, …

## Components

### general
- `Accordion`
- `AccordionContent`
- `AccordionItem`
- `AccordionTrigger`
- `AnimatedTabs`
- `BlurFade`
- `Button`
- `Card`
- `CardAction`
- `CardContent`
- `CardDescription`
- `CardFooter`
- `CardHeader`
- `CardTitle`
- `Checkbox`
- `Command`
- `CommandDialog`
- `CommandEmpty`
- `CommandGroup`
- `CommandInput`
- `CommandItem`
- `CommandList`
- `CommandSeparator`
- `CommandShortcut`
- `Dialog`
- `DialogClose`
- `DialogContent`
- `DialogDescription`
- `DialogFooter`
- `DialogHeader`
- `DialogOverlay`
- `DialogPortal`
- `DialogTitle`
- `DialogTrigger`
- `Field`
- `FieldContent`
- `FieldDescription`
- `FieldError`
- `FieldGroup`
- `FieldLabel`
- `FieldLegend`
- `FieldSeparator`
- `FieldSet`
- `FieldTitle`
- `FileDropzone`
- `FileList`
- `Highlighter`
- `Input`
- `InputGroup`
- `InputGroupAddon`
- `InputGroupButton`
- `InputGroupInput`
- `InputGroupText`
- `InputGroupTextarea`
- `Label`
- `PhoneInput`
- `Popover`
- `PopoverContent`
- `PopoverDescription`
- `PopoverHeader`
- `PopoverTitle`
- `PopoverTrigger`
- `ScrollArea`
- `ScrollBar`
- `Separator`
- `TextAnimate`
- `Textarea`
- `TextReveal`
- `Toaster`
- `UploadedFileItem`
