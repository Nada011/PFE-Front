import { TestBed } from '@angular/core/testing';

import { BonPrestationService } from './bon-prestation.service';

describe('BonPrestationService', () => {
  let service: BonPrestationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonPrestationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
