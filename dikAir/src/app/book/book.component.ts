import { Component, OnInit, Input } from '@angular/core';
import { Flight } from "../flight";
import { FlightService } from '../flight.service';
import { City } from '../city';
import { Router } from "@angular/router";
import { Globals } from "../globals";
import { ToastrService } from "ngx-toastr";
import { ChatService } from "../chat.service";
import { Promise } from 'q';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Input() isAdmin:boolean = false;
  cityList:City[] = []
  flightsList:Flight[] = [];
  flightsToShow:Flight[] = [];

  constructor(private flightService:FlightService, private router:Router, private globals:Globals,
              private toast:ToastrService, private chatService:ChatService) { 
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
    if (price < 0) {
      this.toast.error("Price is lower than zero", "ERROR!");
    } else {
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
}

// deleteFlight(flightId:number) {
//   this.flightService.deleteFlight(flightId).subscribe(res => {
//     if (res === 1) {
//       this.flightsToShow.forEach(element => {
//         if (element.id === flightId) {
//           this.flightsToShow.splice(this.flightsToShow.indexOf(element), 1)
//         }
//       });
//     }
//   })
// }

deleteFlight(flightId:number) {
  this.flightService.getAllBookings().subscribe(bkk => {
    var isAbleToDelete = true;
    bkk.forEach(element => {
      if (element.flightId.toString() === flightId.toString()) {
        isAbleToDelete = false;
      }
    });
    if (isAbleToDelete) {
      this.flightService.deleteFlight(flightId).subscribe(res => {
        if (res === 1) {
          this.flightsToShow.forEach(element => {
            if (element.id === flightId) {
              this.flightsToShow.splice(this.flightsToShow.indexOf(element), 1)
            }
          });
        }
      })
    } else {
      this.toast.error("Can't delete flight already booked", "Error!", {
        timeOut: 5000
      });
    }
  })


}


  editFlight(flightId:number) {
    this.flightService.getFlightById(flightId).subscribe(flt => {
      if (flt != null){
      this.router.navigate(['/editFlight', flightId])
      } else {
        this.toast.error("Can't edit flight because it doesnt exist anymore", "Error!", {
          timeOut: 5000
        });
      }
    })
  }

  bookFlight(flightId:number, price:number) {
    if (this.globals.loggedUser !== null) {
      this.flightService.bookFlight(this.globals.loggedUser.id, flightId, price).subscribe(res => {
        this.chatService.sendOrder(res);
        this.toast.success("Flight Booked Successfully", "Enjoy your flight!", {
          timeOut: 5000
        });

      })
    } else {
      this.toast.error("You have to sign in before booking a flight", "Error!", {
        timeOut: 5000
      });
    }
  }

  isAbleToEditFlight(fligthId:Number) : boolean {
    var isEdit = true;
    this.flightService.getAllBookings().subscribe(res => {
      res.forEach(element => {
        console.log(element);
        console.log(element.flightId.toString());
        console.log(fligthId.toString());
        if (element.flightId.toString() === fligthId.toString())
          isEdit = false;
          console.log(isEdit + '1');
      });
    })
    console.log(isEdit);
    return isEdit;
  }

}
