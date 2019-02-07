import { Component, OnInit } from '@angular/core';
import { User } from "../user";
import { FlightService } from "../flight.service";
import { City } from '../city';
import { Router } from "@angular/router";
import { Globals } from "../globals";

@Component({
  selector: 'app-reglogin',
  templateUrl: './reglogin.component.html',
  styleUrls: ['./reglogin.component.css']
})
export class RegloginComponent implements OnInit {

  constructor(private flightService:FlightService, private router:Router, private globals:Globals) { }

    isLogged = this.globals.isLogged();
    isAdmin = false;
    loggedUser:User = null;
    
    isWantRegister = false;
    cityList:City[] = [];
    isLoginFailed = false;

  ngOnInit() {

  }

  login(email:string, password:string): void {
    this.flightService.login(email, password).subscribe(usr => {
      this.globals.loggedUser = usr;
      if (this.globals.loggedUser !== null) {
        this.router.navigate(['/']);
        this.isLoginFailed = false;
      } else {
        console.log('fail');
        this.isLoginFailed=true;
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
    this.flightService.getCities().subscribe(flts => this.cityList=flts);
  }

  logOut() {
    this.globals.logOut();
    this.router.navigate(['/']);
  }
}
