import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalOperationsFormComponent } from './rental-operations-form.component';

describe('RentalOperationsFormComponent', () => {
  let component: RentalOperationsFormComponent;
  let fixture: ComponentFixture<RentalOperationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalOperationsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalOperationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
