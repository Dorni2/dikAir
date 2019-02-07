import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { User } from "../user";
import { Globals } from "../globals";
import { WordsDic } from '../words-dic';
import { TestingCompilerImpl } from '@angular/platform-browser-dynamic/testing/src/compiler_factory';

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

  constructor(private chatService: ChatService, private globals:Globals ) {
    this.chatService
      .getMessages()
      .subscribe((fetchedMessage: string) => {
        this.fetchedColor = fetchedMessage.split(';')[1];
        this.messages.push(fetchedMessage);
        var messageUser = fetchedMessage.split(";")[0];
        var messageOnly = messageUser.split(": ")[1];
        console.log("message arrive");
        this.hllFunciton(messageOnly);
      });

      // this.testPipe()

   }
  message: string;
  messages: string[] = [];
  hllResult:WordsDic[] = [];
  show:boolean = true;

  sendMessage() {
    this.chatService.sendMessage(this.user.firstName + ": " + this.message + ";" + this.color);
    this.message = '';
  }

  ngOnInit() {
    if(this.globals.isLogged()) {
      this.isLogged = true;
      this.user = this.globals.loggedUser;
    }
  }


  // testPipe() {
  //   this.dorni.push(new WordsDic("Kim", 3));
  //   this.dorni.push(new WordsDic("dor", 4));
  //   this.dorni.push(new WordsDic("787", 787));
  // }


  hllFunciton(message: string) {
    var arrWords = message.split(" ");
    arrWords.forEach(element => {
      var isNeedToAdd = true;
      if (this.hllResult.length !== 0) {
        this.hllResult.forEach(dicValue => {
          if (dicValue.word === element) {
            dicValue.amount = dicValue.amount + 1;
            isNeedToAdd = false;
            // var amount = dicValue.amount;
            // this.hllResult.splice(this.hllResult.findIndex(wrd => wrd.word === dicValue.word), 1);
            // this.hllResult.push(new WordsDic(element, ++amount));
          }
        });
      }
      if (isNeedToAdd) {
        this.hllResult.push(new WordsDic(element, 1));
      }
    });
    this.show = false;
    setTimeout(() => this.show = true);
  }


}
