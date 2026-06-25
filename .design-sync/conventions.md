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
