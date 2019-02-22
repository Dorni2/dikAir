import { Component, OnInit } from '@angular/core';
import { FlightService } from "../flight.service";
import { Flight } from '../flight';
import { Tweet } from '../tweet';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private flightService:FlightService) { }

  ngOnInit() {
  }

  result:string[] = [];

  search(word:string) {
    this.result = [];
    this.flightService.algoSearch(word).subscribe(res => {
      console.log(res);
      res.forEach(element => {
        console.log(element);
        //var twe = new Tweet("United Airlines", element.text);
        this.result.push(element.tweet);
      });
    })
  }

}
