Textarea from powerup-menu-website. Use via `window.PowerUpMenuDS.Textarea` (bundle loaded from the root `_ds_bundle.js`).

## Examples

### Default

```jsx
() => (
  <Textarea placeholder="Describe tu restaurante..." rows={4} />
)
```

### WithValue

```jsx
() => (
  <Textarea defaultValue="Somos un restaurante familiar especializado en cocina mediterránea. Ofrecemos platos frescos y de temporada." rows={4} />
)
```

### Disabled

```jsx
() => (
  <Textarea placeholder="Campo deshabilitado" disabled rows={3} />
)
```
