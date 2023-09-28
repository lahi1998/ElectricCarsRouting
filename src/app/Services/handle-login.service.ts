import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Login } from '../Interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class HandleLoginService {
  url: string = "https://localhost:8443/api/auth";
  endpointLogin: string = "login"; // API endpoint

  constructor(private httpClient: HttpClient) {}

  postLogin(username: string, password: string): Observable<Login> {
    const loginData = { username, password };

    // Send a POST request to the API for login
    return this.httpClient.post<Login>(`${this.url}/${this.endpointLogin}`, loginData)
      .pipe(
        // Handle the response and store the JWT token in session or local storage
        tap((response: any) => {
          if (response.jwtToken) {
            // Store the JWT token in session storage
            sessionStorage.setItem('jwtToken', response.jwtToken);
          }
        })
      );
  }
}
