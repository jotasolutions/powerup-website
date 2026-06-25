import { Button } from 'powerup-menu-website';

export const Default = () => <Button>Get started</Button>;
export const Outline = () => <Button variant="outline">Learn more</Button>;
export const Ghost = () => <Button variant="ghost">Cancel</Button>;
export const Secondary = () => <Button variant="secondary">Save draft</Button>;
export const Destructive = () => <Button variant="destructive">Delete account</Button>;
export const Success = () => <Button variant="success">Confirm order</Button>;
export const Loading = () => <Button isLoading>Processing</Button>;
export const Disabled = () => <Button disabled>Unavailable</Button>;
export const Sizes = () => (
  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
    <Button size="xs">Extra small</Button>
    <Button size="sm">Small</Button>
    <Button>Default</Button>
    <Button size="lg">Large</Button>
  </div>
);
