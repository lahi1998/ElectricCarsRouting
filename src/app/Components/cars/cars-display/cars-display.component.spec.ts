import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsDisplayComponent } from './cars-display.component';

describe('CarsDisplayComponent', () => {
  let component: CarsDisplayComponent;
  let fixture: ComponentFixture<CarsDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarsDisplayComponent]
    });
    fixture = TestBed.createComponent(CarsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
