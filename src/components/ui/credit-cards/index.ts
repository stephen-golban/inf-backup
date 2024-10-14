import { Card } from './card';
import { CardStack } from '@components/common';
import { CardRegister } from './card-register';
import { TermExtension } from './term-extension';

const CreditCards = {
  Card,
  TermExtension,
  Stack: CardStack,
  Register: CardRegister,
};

export { CreditCards };
