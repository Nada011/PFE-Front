import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRetardComponent } from './add-retard.component';

describe('AddRetardComponent', () => {
  let component: AddRetardComponent;
  let fixture: ComponentFixture<AddRetardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRetardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRetardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
