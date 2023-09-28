import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsDeleteComponent } from './cars-delete.component';

describe('CarsDeleteComponent', () => {
  let component: CarsDeleteComponent;
  let fixture: ComponentFixture<CarsDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarsDeleteComponent]
    });
    fixture = TestBed.createComponent(CarsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
