import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarService } from 'src/app/Services/car.service';
import { Observer } from 'rxjs';
import { Car } from 'src/app/Interfaces/car';

@Component({
  selector: 'app-cars-add',
  templateUrl: './cars-add.component.html',
  styleUrls: ['./cars-add.component.css'],
})
export class CarsAddComponent implements OnInit {
  CarForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.CarForm = this.formBuilder.group({
      Model: ['', Validators.required],
      Amount: ['', Validators.required],
      ChangeAmount: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.CarForm.invalid) {
      return;
    }

    const Model = this.CarForm.controls['Model'].value;
    const Amount = this.CarForm.controls['Amount'].value;
    const ChangeAmount = this.CarForm.controls['ChangeAmount'].value;

    const observer: Observer<Car> = {
      next: (response: Car) => {
        // Handle successful car addition response here
        console.log('Car successful', response);

        // Reset the form
        this.CarForm.reset();
      },
      error: (error: any) => {
        // Handle car addition error here
        console.error('Car error', error);
      },
      complete: () => {
        // Handle completion if needed
      }
    };

    this.carService.postCar(Model, Amount, ChangeAmount).subscribe(observer);
  }
}
