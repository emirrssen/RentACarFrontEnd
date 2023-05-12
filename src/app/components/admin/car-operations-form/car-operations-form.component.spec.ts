import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOperationsFormComponent } from './car-operations-form.component';

describe('CarOperationsFormComponent', () => {
  let component: CarOperationsFormComponent;
  let fixture: ComponentFixture<CarOperationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarOperationsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarOperationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
