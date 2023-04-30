import { MenuDetail } from './menuDetail';

export interface Article {
  id: number;
  nomArticleAr: String;
  nomArticleEn: String;
  nomArticleFr: String;
  details: MenuDetail[];
}
