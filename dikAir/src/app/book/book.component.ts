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

  }

  // getAllFlights():any {
  //   this.flightService.getFlights().subscribe(fetchedFlight => this.flightsList = fetchedFlight);
  //   console.log('hello');
  // }

  getAllFlights():any {
    this.flightsList = [];
    this.flightService.getFlights().subscribe(flts => {
      console.log(flts[0])
      flts.forEach(element => {
        this.flightsList.push(element);
      });
    });
  }

}
