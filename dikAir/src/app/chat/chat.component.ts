import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  constructor(private chatService: ChatService) {
    this.chatService
      .getMessages()
      .subscribe((fetchedMessage: string) => {
        this.messages.push(fetchedMessage);
      });
   }
  message: string;
  messages: string[] = [];

  sendMessage() {
    this.chatService.sendMessage(this.message);
    console.log(this.messages);
    this.message = '';
  }

}
