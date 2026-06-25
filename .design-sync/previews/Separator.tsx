import { Separator } from 'powerup-menu-website';

export const Horizontal = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 300 }}>
    <p style={{ fontSize: 14 }}>Información de contacto</p>
    <Separator />
    <p style={{ fontSize: 14 }}>Datos del restaurante</p>
  </div>
);
export const Vertical = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 32 }}>
    <span style={{ fontSize: 14 }}>Inicio</span>
    <Separator orientation="vertical" />
    <span style={{ fontSize: 14 }}>Menú</span>
    <Separator orientation="vertical" />
    <span style={{ fontSize: 14 }}>Contacto</span>
  </div>
);
