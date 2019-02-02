import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Flight } from './flight';
import { City } from "./city";

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


}
