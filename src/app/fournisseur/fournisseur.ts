import { Contrat } from './../contrat/contrat';
export interface Fournisseur {
  id: number;
  nom: String;
  numTel: number;
  fax: number;
  adresse: String;
  codePostal: number;
  ville: String;
  email: String;
  contrats: Contrat[];
}
