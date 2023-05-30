import { BonPrestation } from './bonPrestation';
import { TypeRetard } from './type-retard';
import { Vol } from './vol';

export interface Retard {
  id: number;
  dateDeclanchement: Date;
  typeRetard: TypeRetard;
  bonPrestation: BonPrestation;
  vol: Vol;
}
