import { Component, OnInit } from '@angular/core';
import { Globals } from "../globals";
import { Router } from "@angular/router";
import { FlightService } from "../flight.service";
import { Flight } from '../flight';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

  constructor(private globals:Globals,  private router:Router, private flightService:FlightService) { 
    if(this.globals.loggedUser === null) {
      this.router.navigate(['/error']);
    }
  }

  flightsToShow:Flight[] = [];


  ngOnInit() {
    this.flightService.getBookingByUser(this.globals.loggedUser.id).subscribe(res => {
      res.forEach(element => {
        this.flightService.getFlightById(element.flightId).subscribe(flightRes => {
          this.flightService.getCityById(flightRes.originId).subscribe(origRes => {
            flightRes.origin = origRes.name;
            this.flightService.getCityById(flightRes.destinationId).subscribe(destRes => {
              flightRes.destination = destRes.name;
              this.flightsToShow.push(flightRes);
            })
          })
        })
      });
    })
  }

}
