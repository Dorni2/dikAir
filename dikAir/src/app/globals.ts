import { Injectable } from "@angular/core";
import { User } from './user';
import { FlightService } from "./flight.service";
import { Booking } from './booking';

export class Globals {

    constructor() {}

    private flightService:FlightService;
    loggedUser:User = null;

    isLogged():boolean {
        return (this.loggedUser !== null);
    }

    isAdmin():boolean {
        if (this.loggedUser === null) {
            return false;
        }
        return (this.isLogged && this.loggedUser.isAdmin);
    }

    logOut():void {
        this.loggedUser = null;
    }

    getBookings(): Booking[] {
        if (this.isLogged) {
            this.flightService.getBookingByUser(this.loggedUser.id).subscribe(res => {
                return res;
            })
        } else {
            return null;
        }
    }

}
