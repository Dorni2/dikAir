import { Component, OnInit } from '@angular/core';
import { Flight } from "../flight";
import { FlightService } from '../flight.service';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private flightService:FlightService) { 
  }

  flightsList:Flight[] = [];

  ngOnInit() {
      this.getAllFlights();
  }



  getAllFlights():any {
    this.flightsList = [];
    this.flightService.getFlights().subscribe(flts => {
      flts.forEach(element => {
        this.flightService.getCityById(element.originId).subscribe(ct => element.origin = ct.name);
        this.flightService.getCityById(element.destinationId).subscribe(ct => element.destination = ct.name);
        this.flightsList.push(element);
      });
    });
  }

}
