import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandOperationsFormComponent } from './brand-operations-form.component';

describe('BrandOperationsFormComponent', () => {
  let component: BrandOperationsFormComponent;
  let fixture: ComponentFixture<BrandOperationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandOperationsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandOperationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
