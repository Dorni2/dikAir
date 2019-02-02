import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { User } from "../user";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  isLogged:boolean = false;
  user:User = null;
  color:string = "rgb(" + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ")";
  fetchedColor:string;

  constructor(private chatService: ChatService) {
    this.chatService
      .getMessages()
      .subscribe((fetchedMessage: string) => {
        this.fetchedColor = fetchedMessage.split(';')[1];
        console.log(this.fetchedColor);
        this.messages.push(fetchedMessage);
      });
   }
  message: string;
  messages: string[] = [];

  sendMessage() {
    this.chatService.sendMessage(this.user.firstName + ": " + this.message + ";" + this.color);
    console.log(this.messages);
    this.message = '';
  }

  ngOnInit() {
    if (sessionStorage.getItem('loggedUser') !== null)
    {
      this.user = JSON.parse(sessionStorage.getItem('loggedUser'));
      this.isLogged = true;
    }
  }

}
