import { Article } from './article';
import { MenuDetail } from './menuDetail';
export interface Menu {
  id: number;
  titre: String;
  details: any[];
  total: number;
}
