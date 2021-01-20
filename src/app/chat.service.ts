import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, serverUrl } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  constructor(private http: HttpClient, private auth: AuthService) {


  }

  current: ChatLogResponseModel = { chatLog: [] };


  public sendMessage(message: string, room: string): Observable<ChatLogResponseModel> {
    let choosedRoom=room;
    if (room==undefined)
    choosedRoom=this.auth.rooms[0];
    return this.http.get<ChatLogResponseModel>(`${serverUrl}/room?user=${this.auth.userName}&room=${choosedRoom}&message=${message}&password=${this.auth.password}`);
  }
  public getMessagesInRoom(room: string): Observable<ChatLogResponseModel> {
    let choosedRoom=room;
    if (room==undefined)
    choosedRoom=this.auth.rooms[0];
    return this.http.get<ChatLogResponseModel>(`${serverUrl}/room?user=${this.auth.userName}&room=${choosedRoom}&password=${this.auth.password}`);
  }


}

export interface ChatLogResponseModel {
  chatLog: string[];
}