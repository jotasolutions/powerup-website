InputGroup from powerup-menu-website. Use via `window.PowerUpMenuDS.InputGroup` (bundle loaded from the root `_ds_bundle.js`).

## Examples

### WithIcon

```jsx
() => (
  <InputGroup style={{ maxWidth: 300 }}>
    <InputGroupAddon>
      <InputGroupText><SearchIcon /></InputGroupText>
    </InputGroupAddon>
    <InputGroupInput placeholder="Buscar platillos..." />
  </InputGroup>
)
```

### WithPrefix

```jsx
() => (
  <InputGroup style={{ maxWidth: 300 }}>
    <InputGroupAddon>
      <InputGroupText><AtSignIcon /></InputGroupText>
    </InputGroupAddon>
    <InputGroupInput placeholder="nombre-restaurante" />
    <InputGroupAddon align="inline-end">
      <InputGroupText style={{ fontSize: 12 }}>.powerup.menu</InputGroupText>
    </InputGroupAddon>
  </InputGroup>
)
```

### WithClearButton

```jsx
() => (
  <InputGroup style={{ maxWidth: 300 }}>
    <InputGroupInput defaultValue="La Pergola" />
    <InputGroupAddon align="inline-end">
      <InputGroupButton>
        <XIcon />
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
)
```

### WithCurrencyPrefix

```jsx
() => (
  <InputGroup style={{ maxWidth: 200 }}>
    <InputGroupAddon>
      <InputGroupText>€</InputGroupText>
    </InputGroupAddon>
    <InputGroupInput type="number" placeholder="0.00" />
  </InputGroup>
)
```

## Related

`InputGroupAddon`, `InputGroupButton`, `InputGroupInput`, `InputGroupText`, `InputGroupTextarea`
