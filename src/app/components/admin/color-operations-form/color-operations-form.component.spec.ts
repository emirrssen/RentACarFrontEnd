import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorOperationsFormComponent } from './color-operations-form.component';

describe('ColorOperationsFormComponent', () => {
  let component: ColorOperationsFormComponent;
  let fixture: ComponentFixture<ColorOperationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorOperationsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorOperationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
