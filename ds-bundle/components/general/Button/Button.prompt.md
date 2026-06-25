Button from powerup-menu-website. Use via `window.PowerUpMenuDS.Button` (bundle loaded from the root `_ds_bundle.js`).

## Examples

### Default

```jsx
() => <Button>Get started</Button>
```

### Outline

```jsx
() => <Button variant="outline">Learn more</Button>
```

### Ghost

```jsx
() => <Button variant="ghost">Cancel</Button>
```

### Secondary

```jsx
() => <Button variant="secondary">Save draft</Button>
```

### Destructive

```jsx
() => <Button variant="destructive">Delete account</Button>
```

### Success

```jsx
() => <Button variant="success">Confirm order</Button>
```

### Loading

```jsx
() => <Button isLoading>Processing</Button>
```

### Disabled

```jsx
() => <Button disabled>Unavailable</Button>
```

### Sizes

```jsx
() => (
  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
    <Button size="xs">Extra small</Button>
    <Button size="sm">Small</Button>
    <Button>Default</Button>
    <Button size="lg">Large</Button>
  </div>
)
```
