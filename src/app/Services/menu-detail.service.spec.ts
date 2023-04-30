import { TestBed } from '@angular/core/testing';

import { MenuDetailService } from './menu-detail.service';

describe('MenuDetailService', () => {
  let service: MenuDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
