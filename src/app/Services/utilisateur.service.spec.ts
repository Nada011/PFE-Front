import { Utilisateur } from './../utilisateur/utilisateur';
import { TestBed } from '@angular/core/testing';

import { UtilisateurService } from './utilisateur.service';

describe('TypeRetardService', () => {
  let service: UtilisateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilisateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
