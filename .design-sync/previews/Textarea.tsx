import { Textarea } from 'powerup-menu-website';

export const Default = () => (
  <Textarea placeholder="Describe tu restaurante..." rows={4} />
);
export const WithValue = () => (
  <Textarea defaultValue="Somos un restaurante familiar especializado en cocina mediterránea. Ofrecemos platos frescos y de temporada." rows={4} />
);
export const Disabled = () => (
  <Textarea placeholder="Campo deshabilitado" disabled rows={3} />
);
