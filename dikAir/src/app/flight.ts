import { FlightService } from './flight.service';
import { Observable } from "rxjs";

export class Flight {
    id: number;
    flightNumber: string;
    originId: number;
    destinationId:number;
    price:number;
    origin:string = null;
    destination:string = null;
}
