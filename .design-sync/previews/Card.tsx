import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from 'powerup-menu-website';
import { Button } from 'powerup-menu-website';

export const Basic = () => (
  <Card style={{ maxWidth: 360 }}>
    <CardHeader>
      <CardTitle>Carta Digital QR</CardTitle>
      <CardDescription>Potencia las ventas de tu restaurante</CardDescription>
    </CardHeader>
    <CardContent>
      <p style={{ color: 'var(--muted-foreground)', fontSize: 14 }}>
        Tu carta siempre actualizada, sin costos de impresión y con estadísticas en tiempo real.
      </p>
    </CardContent>
    <CardFooter>
      <Button size="sm">Ver planes</Button>
    </CardFooter>
  </Card>
);

export const WithAction = () => (
  <Card style={{ maxWidth: 360 }}>
    <CardHeader>
      <CardTitle>Estadísticas del mes</CardTitle>
      <CardAction><Button variant="ghost" size="sm">Ver todo</Button></CardAction>
    </CardHeader>
    <CardContent>
      <p style={{ fontSize: 28, fontWeight: 600 }}>1,284</p>
      <p style={{ color: 'var(--muted-foreground)', fontSize: 13 }}>escaneos este mes</p>
    </CardContent>
  </Card>
);

export const Small = () => (
  <Card size="sm" style={{ maxWidth: 280 }}>
    <CardHeader>
      <CardTitle>Plan Pro</CardTitle>
      <CardDescription>Hasta 5 sucursales</CardDescription>
    </CardHeader>
    <CardContent>
      <p style={{ fontSize: 22, fontWeight: 700 }}>$29<span style={{ fontSize: 14, fontWeight: 400 }}>/mes</span></p>
    </CardContent>
    <CardFooter>
      <Button size="sm" style={{ width: '100%' }}>Elegir plan</Button>
    </CardFooter>
  </Card>
);
