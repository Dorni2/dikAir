import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ToastrModule } from "ngx-toastr";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Services
import { ChatService } from './chat.service';

// Components
import { ChatComponent } from './chat/chat.component';
import { MenuComponent } from './menu/menu.component';
import { BookComponent } from './book/book.component';
import { RegloginComponent } from './reglogin/reglogin.component';
import { ChartComponent } from './chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { Globals } from "./globals";
import { ManageComponent } from './manage/manage.component';
import { EditFlightComponent } from './edit-flight/edit-flight.component';
import { CreateFlightComponent } from './create-flight/create-flight.component';
import { EditCityComponent } from './edit-city/edit-city.component';
import { CreateCityComponent } from './create-city/create-city.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { FlightService } from './flight.service';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';

const appRoutes:Routes = [
  {path: 'chat', component: ChatComponent},
  {path: 'book', component: BookComponent},
  {path: 'stats', component: ChartComponent},
  {path: 'manage', component: ManageComponent},
  {path: 'editFlight/:id', component: EditFlightComponent},
  {path: 'error', component: ErrorPageComponent},
  {path: 'orders', component: MyBookingsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    MenuComponent,
    BookComponent,
    RegloginComponent,
    ChartComponent,
    ManageComponent,
    EditFlightComponent,
    CreateFlightComponent,
    EditCityComponent,
    CreateCityComponent,
    ErrorPageComponent,
    MyBookingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpClientModule,
    ChartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [ChatService, Globals, FlightService],
  bootstrap: [AppComponent]
})
export class AppModule { }
