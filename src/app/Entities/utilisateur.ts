import { Role } from './role';

export interface Utilisateur {
  id: number;
  nom: String;
  prenom: String;
  email: String;
  motPasse: String;
  statutCompte: boolean;
  role: Role;
}
