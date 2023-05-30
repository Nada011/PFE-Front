import { Vol } from './vol';

export interface Passager {
  passager_id: number;
  pax: string;
  ordre: number;
  enfant: string;
  partie: String;
  vols: Vol[];
}
