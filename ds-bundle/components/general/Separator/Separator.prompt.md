Separator from powerup-menu-website. Use via `window.PowerUpMenuDS.Separator` (bundle loaded from the root `_ds_bundle.js`).

## Examples

### Horizontal

```jsx
() => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 300 }}>
    <p style={{ fontSize: 14 }}>Información de contacto</p>
    <Separator />
    <p style={{ fontSize: 14 }}>Datos del restaurante</p>
  </div>
)
```

### Vertical

```jsx
() => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 32 }}>
    <span style={{ fontSize: 14 }}>Inicio</span>
    <Separator orientation="vertical" />
    <span style={{ fontSize: 14 }}>Menú</span>
    <Separator orientation="vertical" />
    <span style={{ fontSize: 14 }}>Contacto</span>
  </div>
)
```
