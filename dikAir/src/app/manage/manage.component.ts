import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { BookComponent } from "../book/book.component";
import { Globals } from "../globals";


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor(private globals:Globals, private route: ActivatedRoute, private router:Router) { 
    if(this.globals.loggedUser === null || this.globals.loggedUser.isAdmin !== true) {
      this.router.navigate(['/error']);
    }
  }

isFlights:boolean = false;
isCreateFlight:boolean = false;
isEditCities:boolean = false;
isCreateCity:boolean = false;

  ngOnInit() {
    this.route.params.subscribe(params => {
     this.isEditCities = params['isEditCities'];
     this.isFlights = params['isFlights'];
     this.isCreateFlight = params['isCreateFlight'];
     this.isCreateCity = params['isCreateCity'];
  })
}

  manageFlights() {
    this.isFlights = true;
    this.isCreateFlight = false;
    this.isEditCities = false;
    this.isCreateCity = false;
  }

  createFlight() {
    this.isCreateFlight = true;
    this.isFlights = false;
    this.isEditCities = false;
    this.isCreateCity = false;
  }

  editCities() {
    this.isEditCities = true;
    this.isCreateFlight = false;
    this.isFlights = false;
    this.isCreateCity = false;
  }

  createCity() {
    this.isCreateCity = true;
    this.isEditCities = false;
    this.isCreateFlight = false;
    this.isFlights = false;
  }

}

