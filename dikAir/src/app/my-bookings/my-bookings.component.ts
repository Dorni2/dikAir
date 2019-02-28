import { Component, OnInit } from '@angular/core';
import { Globals } from "../globals";
import { Router } from "@angular/router";
import { FlightService } from "../flight.service";
import { Flight } from '../flight';
import { ChatService } from "../chat.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

  constructor(private globals:Globals,  private router:Router, private flightService:FlightService, private chatService:ChatService, private toast:ToastrService) { 
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
    this.flightService.getAllBookings().subscribe(bkk => {
      var bookingExist = false;
      bkk.forEach(element => {
        if (element.id === bookingId) {
          bookingExist = true;
        }
      });

      if (bookingExist) {
        this.flightService.getAllBookings().subscribe(all => {
          all.forEach(element => {
            if (element.id === bookingId)
            {
              this.flightService.cancelBooking(bookingId).subscribe(res => {
                this.flightsToShow.splice(this.flightsToShow.findIndex(flt => flt['bookingId'] === bookingId), 1);
                console.log(element);
                this.chatService.deleteOrder(element);
              })
            }
          });
        })
      } else {
        this.toast.error("Can't remove flight which doesn't exist", "Error!", {
          timeOut: 5000
        });
      }
    })
  }
}

// cancelOrder(flightId:number, bookingId:number) {
//   this.flightService.getFlightById(flightId).subscribe(flightToDelete => {
//     this.flightService.cancelBooking(flightToDelete.id).subscribe(deleted => {
//       console.log(flightToDelete);
//       this.chatService.deleteOrder(flightToDelete);
//       this.flightsToShow.splice(this.flightsToShow.findIndex(flt => flt.id === flightId), 1);
//     })
//   })
// }
