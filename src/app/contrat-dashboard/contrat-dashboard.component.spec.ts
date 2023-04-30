import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratDashboardComponent } from './contrat-dashboard.component';

describe('ContratDashboardComponent', () => {
  let component: ContratDashboardComponent;
  let fixture: ComponentFixture<ContratDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
