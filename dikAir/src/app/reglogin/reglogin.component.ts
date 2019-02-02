import { Component, OnInit } from '@angular/core';
import { User } from "../user";
import { FlightService } from "../flight.service";
import { City } from '../city';
import { Router } from "@angular/router";

@Component({
  selector: 'app-reglogin',
  templateUrl: './reglogin.component.html',
  styleUrls: ['./reglogin.component.css']
})
export class RegloginComponent implements OnInit {

  constructor(private flightService:FlightService, private router:Router) { }

    isLogged = false;
    isAdmin = false;
    loggedUser:User = null;
    isWantRegister = false;
    cityList:City[] = [];
  ngOnInit() {

  }

  login(email:string, password:string): void {
    this.flightService.login(email, password).subscribe(usr => {
      this.loggedUser = usr;
      if (this.loggedUser !== null) {
        this.isLogged = true;
        this.isAdmin = this.loggedUser.isAdmin;
        sessionStorage.setItem('loggedUser', JSON.stringify(this.loggedUser));
        console.log(sessionStorage.getItem('loggedUser'));
        this.router.navigate(['/']);
      }
    })
  }

  register(email:string, password:string, firstName:string, lastName:string, cityId:number = null):void {
    if(email !== "" && 
       password !== "" &&
       firstName !== "" &&
       lastName !== "" &&
       cityId !== null) {
      this.flightService.register(email, password, firstName, lastName, cityId).subscribe(usr => {
        this.loggedUser = usr;
        this.isLogged = true;
        this.isAdmin = this.loggedUser.isAdmin;
        this.router.navigate(['/']);
        this.isWantRegister = false;
      });
  }
}

  wantRegister() {
    this.isWantRegister = true;
    this.isLogged = true;
    this.flightService.getCities().subscribe(flts => this.cityList=flts);
  }

  logOut() {
    sessionStorage.clear();
    this.isLogged = false;
    this.isAdmin = false;
    this.loggedUser = null;
    this.isWantRegister = false;
    this.router.navigate(['/']);
  }
}
