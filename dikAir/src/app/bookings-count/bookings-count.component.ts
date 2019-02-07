import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Globals } from "../globals";
import { Booking } from '../booking';
import { FlightService } from "../flight.service";
import { Flight } from '../flight';


@Component({
  selector: 'app-bookings-count',
  templateUrl: './bookings-count.component.html',
  styleUrls: ['./bookings-count.component.css']
})
export class BookingsCountComponent implements OnInit {

  constructor(private chatService: ChatService, private globals:Globals, private flightService:FlightService) {
    this.chatService
    .getOrdersCount()
    .subscribe((newOrder:Booking) => {
      console.log("new booking");
      console.log(newOrder);
      this.totalBookings++;
      this.totalPrice += newOrder.totalPrice;
    })

    this.chatService.getDeletedOrder()
    .subscribe((deletedOrder:Booking) => {
      console.log('deleted');
      console.log(deletedOrder);
      this.totalBookings--;
      this.totalPrice -= deletedOrder.totalPrice;
    })
  }

    totalBookings:number = 0;
    totalPrice:number = 0

  ngOnInit() {
    this.flightService.getAllBookings().subscribe(res => {
      res.forEach(element => {
        this.totalBookings++;
        this.totalPrice += element.totalPrice;
      });
    })
  }

}
