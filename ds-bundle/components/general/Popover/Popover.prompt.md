Popover from powerup-menu-website. Use via `window.PowerUpMenuDS.Popover` (bundle loaded from the root `_ds_bundle.js`).

## Examples

### InfoPopover

```jsx
() => (
  <Popover defaultOpen>
    <PopoverTrigger render={<ButtonBase variant="outline" size="icon" />}>
      <InfoIcon />
    </PopoverTrigger>
    <PopoverContent side="bottom">
      <PopoverHeader>
        <PopoverTitle>Plan Pro</PopoverTitle>
        <PopoverDescription>Incluye hasta 5 sucursales y estadísticas avanzadas.</PopoverDescription>
      </PopoverHeader>
      <Button size="sm" style={{ width: '100%' }}>Ver detalles</Button>
    </PopoverContent>
  </Popover>
)
```

### ActionMenu

```jsx
() => (
  <Popover defaultOpen>
    <PopoverTrigger render={<Button variant="outline" />}>
      Opciones
    </PopoverTrigger>
    <PopoverContent side="bottom" align="start">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {['Editar platillo', 'Duplicar', 'Archivar', 'Eliminar'].map((action, i) => (
          <button
            key={action}
            style={{
              textAlign: 'left',
              padding: '6px 8px',
              borderRadius: 6,
              border: 'none',
              background: 'transparent',
              fontSize: 14,
              cursor: 'pointer',
              color: i === 3 ? 'var(--destructive)' : 'var(--foreground)',
            }}
          >
            {action}
          </button>
        ))}
      </div>
    </PopoverContent>
  </Popover>
)
```

## Related

`PopoverContent`, `PopoverDescription`, `PopoverHeader`, `PopoverTitle`, `PopoverTrigger`
