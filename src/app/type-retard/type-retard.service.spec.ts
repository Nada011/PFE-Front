import { TestBed } from '@angular/core/testing';

import { TypeRetardService } from './type-retard.service';

describe('TypeRetardService', () => {
  let service: TypeRetardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeRetardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
