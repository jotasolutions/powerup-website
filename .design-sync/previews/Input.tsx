import { Input } from 'powerup-menu-website';

export const Default = () => <Input placeholder="Tu email" />;
export const WithValue = () => <Input defaultValue="dani@restaurante.com" />;
export const Disabled = () => <Input placeholder="No disponible" disabled />;
export const Invalid = () => <Input aria-invalid="true" defaultValue="email-invalido" />;
export const Password = () => <Input type="password" placeholder="Contraseña" />;
