import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Flight } from './flight';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private httpClient: HttpClient) { }

  public getFlights (): Observable<Flight[]> {
    return this.httpClient.get<Flight[]>("http://localhost:3000/api/flights");
  }
}
