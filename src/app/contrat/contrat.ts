import { Fournisseur } from './../fournisseur/fournisseur';
import { Menu } from '../Entities/menu';
import { MenuDetail } from '../Entities/menuDetail';

export interface Contrat {
  id: number;
  dateDebut: Date;
  dateFin: Date;
  menu: Menu;
  fournisseur: Fournisseur;
}
