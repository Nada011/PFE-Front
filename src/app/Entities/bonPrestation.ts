import { Contrat } from '../contrat/contrat';

export interface BonPrestation {
  id: number;
  validite: Boolean;
  nbr_Benificiaire: number;
  nbr_Bons_distribue: number;
  contrat: Contrat;
}
