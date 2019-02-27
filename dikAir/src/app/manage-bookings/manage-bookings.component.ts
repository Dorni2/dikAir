import { Component, OnInit } from '@angular/core';
import { FlightService } from "../flight.service";
import { Flight } from '../flight';

@Component({
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.css']
})
export class ManageBookingsComponent implements OnInit {

  constructor(private flightService:FlightService) { }

  flightsToShow:Flight[] = [];


  ngOnInit() {
    this.flightService.getAllBookings().subscribe(res => {
      res.forEach(element => {
        this.flightService.getFlightById(element.flightId).subscribe(flightRes => {
          this.flightService.getCityById(flightRes.originId).subscribe(origRes => {
            flightRes.origin = origRes.name;
            this.flightService.getCityById(flightRes.destinationId).subscribe(destRes => {
              flightRes.destination = destRes.name;
              flightRes['bookingId'] = element.id;
              this.flightsToShow.push(flightRes);
            })
          })
        })
      });
    })
  }

  cancelOrder(bookingId:number) {
    console.log(bookingId);
    this.flightService.getAllBookings().subscribe(all => {
      all.forEach(element => {
        if (element.id === bookingId)
        {
          this.flightService.cancelBooking(bookingId).subscribe(res => {
            this.flightsToShow.splice(this.flightsToShow.findIndex(flt => flt['bookingId'] === bookingId), 1);
            console.log(element);
            //this.chatService.deleteOrder(element);
          })
        }
      });
    })
    this.flightService.cancelBooking(bookingId).subscribe(deletedBooking => {

    })
  }

}
