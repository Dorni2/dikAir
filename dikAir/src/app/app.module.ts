import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Services
import { ChatService } from './chat.service';

// Components
import { ChatComponent } from './chat/chat.component';

const appRoutes:Routes = [
  {path: 'chat', component: ChatComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
