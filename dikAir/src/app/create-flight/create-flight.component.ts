import { Component, OnInit } from '@angular/core';
import { City } from '../city';
import { FlightService } from "../flight.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.css']
})
export class CreateFlightComponent implements OnInit {

  constructor(private flightService:FlightService, private router:Router) { }

  citiesList:City[] = [];

  ngOnInit() {
    this.flightService.getCities().subscribe(res => {
      this.citiesList = res;
    })
  }

  createFlight(flightNumber:string, flightPrice:number, originId:number, destinationId:number) {
    this.flightService.createFlight(flightNumber, flightPrice, originId, destinationId).subscribe(res => {
      this.router.navigate(['/editFlight/', res.id]);
    })
  }

}
