import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from 'powerup-menu-website';
import { SearchIcon, AtSignIcon, XIcon } from 'lucide-react';

export const WithIcon = () => (
  <InputGroup style={{ maxWidth: 300 }}>
    <InputGroupAddon>
      <InputGroupText><SearchIcon /></InputGroupText>
    </InputGroupAddon>
    <InputGroupInput placeholder="Buscar platillos..." />
  </InputGroup>
);

export const WithPrefix = () => (
  <InputGroup style={{ maxWidth: 300 }}>
    <InputGroupAddon>
      <InputGroupText><AtSignIcon /></InputGroupText>
    </InputGroupAddon>
    <InputGroupInput placeholder="nombre-restaurante" />
    <InputGroupAddon align="inline-end">
      <InputGroupText style={{ fontSize: 12 }}>.powerup.menu</InputGroupText>
    </InputGroupAddon>
  </InputGroup>
);

export const WithClearButton = () => (
  <InputGroup style={{ maxWidth: 300 }}>
    <InputGroupInput defaultValue="La Pergola" />
    <InputGroupAddon align="inline-end">
      <InputGroupButton>
        <XIcon />
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
);

export const WithCurrencyPrefix = () => (
  <InputGroup style={{ maxWidth: 200 }}>
    <InputGroupAddon>
      <InputGroupText>€</InputGroupText>
    </InputGroupAddon>
    <InputGroupInput type="number" placeholder="0.00" />
  </InputGroup>
);
