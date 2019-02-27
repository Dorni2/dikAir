import { Component, OnInit } from "@angular/core";
import { City } from "../city";
import { FlightService } from "../flight.service";
import { Router } from "@angular/router";
import { tryParse } from "selenium-webdriver/http";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-create-flight",
  templateUrl: "./create-flight.component.html",
  styleUrls: ["./create-flight.component.css"]
})
export class CreateFlightComponent implements OnInit {
  constructor(
    private flightService: FlightService,
    private router: Router,
    private toast: ToastrService
  ) {}

  citiesList: City[] = [];

  ngOnInit() {
    this.flightService.getCities().subscribe(res => {
      this.citiesList = res;
    });
  }

  createFlight(
    flightNumber: string,
    flightPrice: number,
    originId: number,
    destinationId: number
  ) {
    if (flightNumber === "" || isNaN(flightPrice)) {
      this.toast.error(
        "Something went wrong, check your values please",
        "Error!",
        {
          timeOut: 5000
        }
      );
    } else {
      this.flightService
        .createFlight(flightNumber, flightPrice, originId, destinationId)
        .subscribe(res => {
          this.router.navigate(["/editFlight/", res.id]);
        });
    }
  }
}
