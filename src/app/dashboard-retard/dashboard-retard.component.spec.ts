import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRetardComponent } from './dashboard-retard.component';

describe('DashboardRetardComponent', () => {
  let component: DashboardRetardComponent;
  let fixture: ComponentFixture<DashboardRetardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardRetardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardRetardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
