Input from powerup-menu-website. Use via `window.PowerUpMenuDS.Input` (bundle loaded from the root `_ds_bundle.js`).

## Examples

### Default

```jsx
() => <Input placeholder="Tu email" />
```

### WithValue

```jsx
() => <Input defaultValue="dani@restaurante.com" />
```

### Disabled

```jsx
() => <Input placeholder="No disponible" disabled />
```

### Invalid

```jsx
() => <Input aria-invalid="true" defaultValue="email-invalido" />
```

### Password

```jsx
() => <Input type="password" placeholder="Contraseña" />
```

## Related

`InputGroup`, `InputGroupAddon`, `InputGroupButton`, `InputGroupInput`, `InputGroupText`, `InputGroupTextarea`
