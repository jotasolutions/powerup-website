Field from powerup-menu-website. Use via `window.PowerUpMenuDS.Field` (bundle loaded from the root `_ds_bundle.js`).

## Examples

### BasicField

```jsx
() => (
  <Field style={{ maxWidth: 320 }}>
    <FieldTitle>Nombre del restaurante</FieldTitle>
    <Input placeholder="Ej: La Pergola" />
  </Field>
)
```

### WithDescription

```jsx
() => (
  <Field style={{ maxWidth: 320 }}>
    <FieldTitle>Correo electrónico</FieldTitle>
    <FieldDescription>Recibirás tu código QR en este correo.</FieldDescription>
    <Input type="email" placeholder="dani@restaurante.com" />
  </Field>
)
```

### WithError

```jsx
() => (
  <Field data-invalid="true" style={{ maxWidth: 320 }}>
    <FieldTitle>Teléfono</FieldTitle>
    <Input aria-invalid="true" defaultValue="+34 9" />
    <FieldError errors={[{ message: 'El teléfono debe tener al menos 9 dígitos.' }]} />
  </Field>
)
```

### FieldSetExample

```jsx
() => (
  <FieldSet style={{ maxWidth: 340 }}>
    <FieldLegend>Datos de contacto</FieldLegend>
    <FieldGroup>
      <Field>
        <FieldTitle>Nombre</FieldTitle>
        <Input placeholder="Tu nombre" />
      </Field>
      <Field>
        <FieldTitle>Teléfono</FieldTitle>
        <Input placeholder="+34 600 000 000" />
      </Field>
      <Field>
        <FieldTitle>Mensaje</FieldTitle>
        <Textarea placeholder="¿En qué te podemos ayudar?" rows={3} />
      </Field>
    </FieldGroup>
  </FieldSet>
)
```

## Related

`FieldContent`, `FieldDescription`, `FieldError`, `FieldGroup`, `FieldLabel`, `FieldLegend`, `FieldSeparator`, `FieldSet`, `FieldTitle`
