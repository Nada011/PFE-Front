import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonPrestationComponent } from './bon-prestation.component';

describe('BonPrestationComponent', () => {
  let component: BonPrestationComponent;
  let fixture: ComponentFixture<BonPrestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonPrestationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonPrestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
