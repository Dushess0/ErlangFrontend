import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { interval } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {


  @ViewChild('roomMatList')
  roomMatList?: MatSelectionList;

  showRooms: boolean = true;
  messages: string[] = [];
  autoScrolling = true;
  rooms: string[] = [];
  currentRoom: number = 0;
  currentMessage: string = "";
  constructor(public chat: ChatService, private auth: AuthService) {
    this.myScrollContainer = {} as ElementRef<any>;
  }

  @ViewChild('Scroll')
  myScrollContainer: ElementRef;


  ngOnInit(): void {
    this.scrollToBottom();
    this.rooms = this.auth.rooms;
    interval(600).subscribe(
      data =>
        this.chat.getMessagesInRoom(this.rooms[this.currentRoom]).subscribe(
          mess => {
            if (this.messages.length != mess.chatLog.length) {
              this.messages = mess.chatLog
            }
          }
        ));
  }

  autoScrollClicked() {
    this.autoScrolling = !this.autoScrolling;

  }
  ngAfterViewChecked() {
    if (this.autoScrolling) {
      this.scrollToBottom();
    }
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer?.nativeElement.scrollHeight;
    } catch (err) { }
  }
  sendMessage() {
    if (this.currentRoom != undefined && this.auth.rooms.length != 0) {
      this.chat.sendMessage(this.currentMessage, this.rooms[this.currentRoom]).subscribe(data => {
        this.currentMessage = "";
      })
    }
  }
  switchRoom(room: string) {
    this.currentRoom = this.rooms.indexOf(room);
    console.log(this.currentRoom);
  }
  createRoom() {
    const result = prompt("Enter room name");
    if (result) {
      this.rooms.push(result);
      this.switchRoom(result);
      this.sendMessage();
    }
  }

}

