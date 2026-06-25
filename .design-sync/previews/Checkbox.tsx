import { Checkbox } from 'powerup-menu-website';
import { Label } from 'powerup-menu-website';

export const Unchecked = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <Checkbox id="terms" />
    <Label htmlFor="terms">Acepto los términos y condiciones</Label>
  </div>
);
export const Checked = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <Checkbox id="newsletter" defaultChecked />
    <Label htmlFor="newsletter">Recibir novedades y ofertas</Label>
  </div>
);
export const Disabled = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <Checkbox id="disabled-opt" disabled />
    <Label htmlFor="disabled-opt" style={{ opacity: 0.5 }}>Opción no disponible</Label>
  </div>
);
export const Group = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    {['Desayuno', 'Almuerzo', 'Cena', 'Brunch'].map((item) => (
      <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Checkbox id={item} defaultChecked={item === 'Almuerzo' || item === 'Cena'} />
        <Label htmlFor={item}>{item}</Label>
      </div>
    ))}
  </div>
);
