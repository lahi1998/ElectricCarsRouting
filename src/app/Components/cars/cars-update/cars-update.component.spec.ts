import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsUpdateComponent } from './cars-update.component';

describe('CarsUpdateComponent', () => {
  let component: CarsUpdateComponent;
  let fixture: ComponentFixture<CarsUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarsUpdateComponent]
    });
    fixture = TestBed.createComponent(CarsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
