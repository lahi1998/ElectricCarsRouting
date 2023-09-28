import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarService } from 'src/app/Services/car.service';
import { Observer } from 'rxjs';
import { Car } from 'src/app/Interfaces/car';

@Component({
  selector: 'app-cars-delete',
  templateUrl: './cars-delete.component.html',
  styleUrls: ['./cars-delete.component.css']
})
export class CarsDeleteComponent implements OnInit {
  CarFormDelete!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.CarFormDelete = this.formBuilder.group({
      Model: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.CarFormDelete.invalid) {
      return;
    }

    const Model = this.CarFormDelete.controls['Model'].value;

    const observer: Observer<Car> = {
      next: (response: Car) => {
        // Handle successful car addition response here
        console.log('Car successful', response);

        // Reset the form
        this.CarFormDelete.reset();
      },
      error: (error: any) => {
        // Handle car addition error here
        console.error('Car error', error);
      },
      complete: () => {
        // Handle completion if needed
      }
    };

    this.carService.deleteCar(Model).subscribe(observer);
  }
}
