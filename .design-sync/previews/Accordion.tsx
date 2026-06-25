import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'powerup-menu-website';

export const FAQ = () => (
  <Accordion defaultValue="item-1" style={{ maxWidth: 420 }}>
    <AccordionItem value="item-1">
      <AccordionTrigger>¿Puedo actualizar mi carta en cualquier momento?</AccordionTrigger>
      <AccordionContent>
        Sí, puedes actualizar tu carta digital en tiempo real desde nuestro panel de administración. Los cambios se reflejan al instante para tus clientes.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>¿Qué pasa si tengo varias sucursales?</AccordionTrigger>
      <AccordionContent>
        Nuestro plan Pro te permite gestionar hasta 5 sucursales desde una sola cuenta. Cada una puede tener su propia carta y configuración.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>¿Necesito conocimientos técnicos?</AccordionTrigger>
      <AccordionContent>
        No. La plataforma está diseñada para ser muy fácil de usar. Si sabes usar un smartphone, puedes gestionar tu carta digital.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

export const MultipleOpen = () => (
  <Accordion openMultiple defaultValue={['q1', 'q2']} style={{ maxWidth: 420 }}>
    <AccordionItem value="q1">
      <AccordionTrigger>¿Cuánto cuesta?</AccordionTrigger>
      <AccordionContent>Desde $9/mes con prueba gratuita de 14 días.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="q2">
      <AccordionTrigger>¿Hay contratos de permanencia?</AccordionTrigger>
      <AccordionContent>No. Puedes cancelar cuando quieras sin penalizaciones.</AccordionContent>
    </AccordionItem>
  </Accordion>
);
