import { MenuDetail } from './menuDetail';

export interface addRetardRequest {
  typeRetard: String;
  dateDeclanchement: String;
  vol: String;
  contrat: MenuDetail[];
}
