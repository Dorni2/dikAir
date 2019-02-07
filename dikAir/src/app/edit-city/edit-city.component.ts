import { Component, OnInit } from '@angular/core';
import { FlightService } from "../flight.service";
import { City } from '../city';
import { Router, Route } from "@angular/router";

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.css']
})
export class EditCityComponent implements OnInit {

  constructor(private flightService:FlightService, private router:Router) { }

  citiesList:City[] = [];

  ngOnInit() {
    this.flightService.getCities().subscribe(res => {
      this.citiesList = res;
    })
  }

  deleteCity(cityId:number) {    
    this.flightService.deleteCity(cityId).subscribe(res => {
      this.citiesList.forEach(element => {
        if(element.id === cityId) {
          this.citiesList.splice(this.citiesList.indexOf(element), 1);
        }
      });
    })
  }

  saveChanges(id:number, newName:string) {
    this.flightService.updateCity(id, newName).subscribe(res => {
      this.flightService.getCityById(id).subscribe(res => {
        this.citiesList.find(ct => ct.id === id).name = res.name;
        console.log(this.citiesList);
      })
      });
    }
}
