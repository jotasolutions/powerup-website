Dialog from powerup-menu-website. Use via `window.PowerUpMenuDS.Dialog` (bundle loaded from the root `_ds_bundle.js`).

## Examples

### ConfirmDelete

```jsx
() => (
  <Dialog open>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Eliminar platillo</DialogTitle>
        <DialogDescription>
          ¿Estás seguro de que quieres eliminar "Pizza Margherita"? Esta acción no se puede deshacer.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline">Cancelar</Button>
        <Button variant="destructive">Eliminar</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)
```

### ContactForm

```jsx
() => (
  <Dialog open>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Contactar con soporte</DialogTitle>
        <DialogDescription>
          Describe tu problema y te responderemos en menos de 24 horas.
        </DialogDescription>
      </DialogHeader>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', fontSize: 14, outline: 'none' }}
          placeholder="Asunto"
        />
        <textarea
          style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', fontSize: 14, outline: 'none', minHeight: 80, resize: 'vertical' }}
          placeholder="Describe tu problema..."
        />
      </div>
      <DialogFooter>
        <Button variant="outline">Cancelar</Button>
        <Button>Enviar mensaje</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)
```

## Related

`DialogClose`, `DialogContent`, `DialogDescription`, `DialogFooter`, `DialogHeader`, `DialogOverlay`, `DialogPortal`, `DialogTitle`, `DialogTrigger`
