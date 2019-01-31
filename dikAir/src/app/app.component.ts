import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  message: string;
  messages: string[] = [];

  constructor(private chatService: ChatService) {
    this.chatService
      .getMessages()
      .subscribe((fetchedMessage: string) => {
        this.messages.push(fetchedMessage);
      });
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    console.log(this.messages);
    this.message = '';
  }
}