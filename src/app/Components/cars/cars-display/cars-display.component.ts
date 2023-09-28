// cars-display.component.ts

import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/Interfaces/car';
import { CarService } from 'src/app/Services/car.service';

@Component({
  selector: 'app-cars-display',
  templateUrl: './cars-display.component.html',
  styleUrls: ['./cars-display.component.css'],
})
export class CarsDisplayComponent implements OnInit {
  cars: Car[] = [];

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    // Fetch the initial list of cars
    this.carService.getCars().subscribe((cars) => {
      this.cars = cars;
    });
  }
}
