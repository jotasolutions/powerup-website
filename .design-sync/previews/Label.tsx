import { Label } from 'powerup-menu-website';
import { Input } from 'powerup-menu-website';

export const Standalone = () => <Label>Nombre del restaurante</Label>;
export const WithInput = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 280 }}>
    <Label htmlFor="restaurant-name">Nombre del restaurante</Label>
    <Input id="restaurant-name" placeholder="Ej: La Pergola" />
  </div>
);
export const WithInputRequired = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 280 }}>
    <Label htmlFor="email-req">
      Email <span style={{ color: 'var(--destructive)' }}>*</span>
    </Label>
    <Input id="email-req" type="email" placeholder="dani@restaurante.com" />
  </div>
);
