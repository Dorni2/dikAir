import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';

import { FlightService } from "../flight.service";
import { Flight } from '../flight';

@Component({
  selector: 'app-edit-flight',
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.css']
})
export class EditFlightComponent implements OnInit {

  constructor(private route: ActivatedRoute, private flightService:FlightService, private router:Router) {}

  id:number = null;
  flightToEdit:Flight = new Flight();
  isEnable:boolean = false;

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.id = +params['id'];
       this.flightService.getFlightById(this.id).subscribe(res => {
        this.flightToEdit = res;
        this.flightService.getCityById(this.flightToEdit.originId).subscribe(res => {
          this.flightToEdit.origin = res.name;
      })

      this.flightService.getCityById(this.flightToEdit.destinationId).subscribe(res => {
        this.flightToEdit.destination = res.name;
        })
        this.flightService.getAllBookings().subscribe(bkk => {
          console.log(bkk);
          bkk.forEach(element => {
            if (element.flightId.toString() === this.id.toString()) {
              this.isEnable = true;
            }
          });
        })
      });
    });

    

  }

  saveChanges(number:string, price:number) {
    this.flightService.updateFlight(this.flightToEdit.id, number, price).subscribe(res => {
      this.router.navigate(['/manage'])
    })
  }

  

}
