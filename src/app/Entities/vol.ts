import { Passager } from './passager';
import { Retard } from './retard';

export interface Vol {
  vol_id: number;
  vol: string;
  nb_ENF: number;
  date_VOL: Date;
  destination: string;
  origine: string;
  nb_PAX: number;
  cie: string;
  passagers: Passager[];
  retards: Retard[];
}
