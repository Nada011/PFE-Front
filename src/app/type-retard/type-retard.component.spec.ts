import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeRetardComponent } from './type-retard.component';

describe('TypeRetardComponent', () => {
  let component: TypeRetardComponent;
  let fixture: ComponentFixture<TypeRetardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeRetardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeRetardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
