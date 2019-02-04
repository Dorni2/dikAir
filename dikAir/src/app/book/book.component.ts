import { Component, OnInit, Input } from '@angular/core';
import { Flight } from "../flight";
import { FlightService } from '../flight.service';
import { City } from '../city';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Input() isAdmin:boolean = true;
  cityList:City[] = []
  flightsList:Flight[] = [];
  flightsToShow:Flight[] = [];

  constructor(private flightService:FlightService) { 
  }


  ngOnInit() {
      this.getAllFlights();
      this.flightService.getCities().subscribe(cts => this.cityList = cts);

  }



  getAllFlights():any {
    this.flightsList = [];
    this.flightsToShow = [];
    this.flightService.getFlights().subscribe(flts => {
      flts.forEach(element => {
        this.flightService.getCityById(element.originId).subscribe(ct => element.origin = ct.name);
        this.flightService.getCityById(element.destinationId).subscribe(ct => element.destination = ct.name);
        this.flightsList.push(element);
        this.flightsToShow.push(element);
      });
    });
  }

  filter(price:number, originId:number, destinationId:number):void {
    this.flightsToShow = this.flightsList;
    //console.log("price " + price + " orig " + originId);
    if (price != null && price > 0) {
      this.flightsToShow = this.flightsToShow.filter(flt => flt.price <= price)
    }

    if (originId != 0){
      this.flightsToShow = this.flightsToShow.filter(flt => flt.originId.toString() === originId.toString());
    }
    if (destinationId != 0){
      this.flightsToShow = this.flightsToShow.filter(flt => flt.destinationId.toString() === destinationId.toString());
    }
  }

  deleteFlight(flightId:number) {
    this.flightService.deleteFlight(flightId).subscribe(res => {
      if (res === 1) {
        this.flightsToShow.forEach(element => {
          if (element.id === flightId) {
            this.flightsToShow.splice(this.flightsToShow.indexOf(element), 1)
          }
        });
      }
    })
  }

}
