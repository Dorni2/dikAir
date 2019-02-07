import { Component, OnInit } from '@angular/core';
import { FlightService } from "../flight.service";
import { Flight } from '../flight';
import { StatObject } from "../stat-object";
import { Globals } from "../globals";
import { Router } from "@angular/router";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor(private globals:Globals,  private router:Router, private flightService:FlightService) { 
    if(this.globals.loggedUser === null || this.globals.loggedUser.isAdmin !== true) {
      this.router.navigate(['/error']);
    }
  }

destinations:string[] = [];
count:number[] = [];
destWithNames:string[] = [];  

  ngOnInit() {
    this.flightService.getFlightStats().subscribe(allStats => {
      allStats.forEach(stat => {
        this.destinations.push(stat._id.toString());
        this.count.push(stat.count);
      })
      this.destinations.forEach(element => {
        let cityId = parseInt(element);
        this.flightService.getCityById(cityId).subscribe(res => this.destWithNames.push(res.name));
      });
    })
  }


  public ChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero:true
          }
      }]
  }
  };
  public ChartLabels = this.destWithNames;
  public ChartType = 'bar';
  public ChartLegend = true;
  public ChartData = [
    {data: this.count, label: 'Amount of flights per destination', borderWidth: 2}
  ];

  
}
