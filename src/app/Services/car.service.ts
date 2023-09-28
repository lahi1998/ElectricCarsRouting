import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Car } from '../Interfaces/car';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  url: string = "https://localhost:8443/api/Cars";
  endpointAddCar: string = "addCar"; // API endpoint to add a car
  endpointGetCars: string = "getAllCars"; // API endpoint to get all cars
  cars: Car[] = [];

  constructor(private httpClient: HttpClient) { }

  postCar(Model: string, Amount: number, ChangeAmount: number): Observable<Car> {
    const CarData = { Model, Amount, ChangeAmount };

    // Retrieve the JWT token from SessionStorage
    const token = this.getSessionToken('jwtToken');
    console.log(token);
    // check token
    if (token === null) {
      console.error('JWT token not found in session. post car');
    }

    // Include the token in the Authorization header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.post<Car>(`${this.url}/${this.endpointAddCar}`, CarData, { headers })
      .pipe(
        tap((car: Car) => {
          // After adding a car, update the list of cars
          this.cars.push(car);
        })
      );
  }

  // Fetch the list of all cars
  getCars(): Observable<Car[]> {
    // Retrieve the JWT token from SessionStorage
    const token = this.getSessionToken('jwtToken');
    // check token
    if (token === null) {
      console.error('JWT token not found in session. get car');
    }
    // Include the token in the Authorization header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<Car[]>(`${this.url}/${this.endpointGetCars}`, { headers });

  }

  updateCar(Model: string, Amount: number, ChangeAmount: number): Observable<Car> {
    const CarData = { Model, Amount, ChangeAmount };

    // Retrieve the JWT token from SessionStorage
    const token = this.getSessionToken('jwtToken');
    console.log(token);
    // check token
    if (token === null) {
      console.error('JWT token not found in session. post car');
    }

    // Include the token in the Authorization header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.post<Car>(`${this.url}/${this.endpointAddCar}`, CarData, { headers })
      .pipe(
        tap((car: Car) => {
          // After adding a car, update the list of cars
          this.cars.push(car);
        })
      );
  }


  deleteCar(Model: string): Observable<Car> {
    const CarData = { Model};

    // Retrieve the JWT token from SessionStorage
    const token = this.getSessionToken('jwtToken');
    console.log(token);
    // check token
    if (token === null) {
      console.error('JWT token not found in session. post car');
    }

    // Include the token in the Authorization header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.post<Car>(`${this.url}/${this.endpointAddCar}`, CarData, { headers })
      .pipe(
        tap((car: Car) => {
          // After adding a car, update the list of cars
          this.cars.push(car);
        })
      );
  }


  // Function to get a specific cookie by name
  private getSessionToken(name: string): string | null {
    return sessionStorage.getItem('jwtToken');
  }

}