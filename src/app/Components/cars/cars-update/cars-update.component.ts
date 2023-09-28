import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarService } from 'src/app/Services/car.service';
import { Observer } from 'rxjs';
import { Car } from 'src/app/Interfaces/car';

@Component({
  selector: 'app-cars-update',
  templateUrl: './cars-update.component.html',
  styleUrls: ['./cars-update.component.css']
})
export class CarsUpdateComponent implements OnInit {
  CarFormUpdate!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.CarFormUpdate = this.formBuilder.group({
      Model: ['', Validators.required],
      Amount: ['', Validators.required],
      ChangeAmount: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.CarFormUpdate.invalid) {
      return;
    }

    const Model = this.CarFormUpdate.controls['Model'].value;
    const Amount = this.CarFormUpdate.controls['Amount'].value;
    const ChangeAmount = this.CarFormUpdate.controls['ChangeAmount'].value;

    const observer: Observer<Car> = {
      next: (response: Car) => {
        // Handle successful car addition response here
        console.log('Car successful', response);

        // Reset the form
        this.CarFormUpdate.reset();
      },
      error: (error: any) => {
        // Handle car addition error here
        console.error('Car error', error);
      },
      complete: () => {
        // Handle completion if needed
      }
    };

    this.carService.updateCar(Model, Amount, ChangeAmount).subscribe(observer);
  }
}
