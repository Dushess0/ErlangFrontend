import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval } from 'rxjs';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  showRooms: boolean = true;
  messages: string[] = [];
  currentRoom: string = "Test room";
  currentMessage: string = "";
  constructor(public chat: ChatService) {
    this.myScrollContainer = {} as ElementRef<any>;
  }

  @ViewChild('Scroll')
  myScrollContainer: ElementRef;


  ngOnInit(): void {
    this.scrollToBottom();
    interval(600).subscribe(
      data=>
      this.chat.getMessagesInRoom(this.currentRoom).subscribe(mess=>this.messages=mess.chatLog))

      
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer?.nativeElement.scrollHeight;
    } catch (err) { }
  }
  sendMessage() {
    this.chat.sendMessage(this.currentMessage, this.currentRoom).subscribe(data => {
      this.currentMessage = "";
    })
  }
  switchRoom() {

  }

}

