import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichageVolComponent } from './affichage-vol.component';

describe('AffichageVolComponent', () => {
  let component: AffichageVolComponent;
  let fixture: ComponentFixture<AffichageVolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffichageVolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffichageVolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
