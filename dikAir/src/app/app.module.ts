import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from '@angular/router';

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

const appRoutes:Routes = [
  {path: 'chat', component: ChatComponent},
  {path: 'book', component: BookComponent},
  {path: 'stats', component: ChartComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    MenuComponent,
    BookComponent,
    RegloginComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpClientModule,
    ChartsModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
