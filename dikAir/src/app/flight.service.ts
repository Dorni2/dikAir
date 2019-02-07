import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Flight } from './flight';
import { City } from "./city";
import { User } from "./user";
import { StatObject } from "./stat-object";
import { Booking } from './booking';

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

  public deleteCity(id:number): Observable<any> {
    var address:string = "http://localhost:3000/api/cities/delete/" + id;
    return this.httpClient.get<any>(address);
  }

  public updateCity(id:number, newName:string): Observable<City> {
    var address:string = "http://localhost:3000/api/cities/update/" + id + "&" + newName;
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

  public createCity(name:string): Observable<City> {
    var address:string = "http://localhost:3000/api/cities/new/" + name;
    return this.httpClient.get<City>(address);
  }

  public getFlightStats(): Observable<StatObject[]> {
    var address:string = "http://localhost:3000/api/flights/stats";
    return this.httpClient.get<StatObject[]>(address);
  }

  public deleteFlight(flightId:number): Observable<number> {
    var address = "http://localhost:3000/api/flights/delete/" + flightId;
    return this.httpClient.get<number>(address);
  }

  public getFlightById(flightId:number): Observable<Flight> {
    var address = "http://localhost:3000/api/flights/" + flightId;
    return this.httpClient.get<Flight>(address);
  }

  public updateFlight(flightId:number, newFlightNumber:string, newPrice:number): Observable<any> {
    var address = "http://localhost:3000/api/flights/update/" + flightId + "&" + newFlightNumber + "&" + newPrice;
    return this.httpClient.get(address);
  }

  public createFlight(flightNumber:string, flightPrice:number, originId:number, destinationId:number): Observable<Flight> {
    var address = "http://localhost:3000/api/flights/new/" + flightNumber + "&" + originId + "&" + destinationId + "&" + flightPrice;
    return this.httpClient.get<Flight>(address);
  }

  public getBookingByUser(userId:number): Observable<Booking[]> {
    var address = "http://localhost:3000/api/bookings/bookByUser/" + userId;
    return this.httpClient.get<Booking[]>(address);
  }

  public bookFlight(userId:number, flightId:number, totalPrice:number): Observable<Booking> {
    var address = "http://localhost:3000/api/bookings/new/" + userId + "&" + flightId + "&" + totalPrice;
    console.log(address);
    return this.httpClient.get<Booking>(address);
  }
}
