import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Flight } from './flight';
import { City } from "./city";
import { User } from "./user";

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private httpClient: HttpClient) { }

  public getFlights (): Observable<Flight[]> {
    return this.httpClient.get<Flight[]>("http://localhost:3000/api/flights");
  }

  public getCityById(id:number): Observable<City> {
    var address:string = "http://localhost:3000/api/cities/" + id;
    return this.httpClient.get<City>(address);

  }

  public login(email:string, password:string): Observable<User> {
    var address:string = "http://localhost:3000/api/users/login/" + email + "&" + password;
    return this.httpClient.get<User>(address);
  }

  public register(email:string, password:string, firstName:string, lastName:string, cityId:number): Observable<User> {
    var address:string = "http://localhost:3000/api/users/new/" + firstName + "&" + lastName + "&" + cityId + "&" + email + "&" + password + "&" + "false";
    return this.httpClient.get<User>(address);
  }

  public getCities(): Observable<City[]> {
    var address:string = "http://localhost:3000/api/cities";
    return this.httpClient.get<City[]>(address);
  }



}
