import { Component, OnInit } from '@angular/core';
import { FlightService } from "../flight.service";
import { Router } from "@angular/router";
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-create-city',
  templateUrl: './create-city.component.html',
  styleUrls: ['./create-city.component.css']
})
export class CreateCityComponent implements OnInit {

  constructor(private fligthService:FlightService, private router:Router) { }

  ngOnInit() {
  }

  createCity(name:string, country:string) {
    this.fligthService.createCity(name + "," + country).subscribe(res => {
      this.router.navigate(['/manage'])
    })
  }

}
