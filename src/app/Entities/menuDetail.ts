import { Article } from './article';
import { Menu } from './menu';

export interface MenuDetail {
  id: number;
  prix: number;
  article: Article;
  menu: Menu;
}
