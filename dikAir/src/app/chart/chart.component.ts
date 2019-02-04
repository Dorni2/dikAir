import { Component, OnInit } from '@angular/core';
import { FlightService } from "../flight.service";
import { Flight } from '../flight';
import { StatObject } from "../stat-object";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor(private flightService:FlightService) { }

destinations:string[] = [];
count:number[] = [];
destWithNames:string[] = [];

  // ngOnInit() {
  //   this.flightService.getFlightStats().subscribe(allStats => {
  //     allStats.forEach(stat => {
  //       this.flightService.getCityById(stat.destinationId).subscribe(res => {
  //         stat.destination = res.name;
  //         console.log(res.toString());
  //         this.destinations.push(stat.destination);
  //         this.count.push(stat.count);
  //       });
  //     })
  //   })    
  // }

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
