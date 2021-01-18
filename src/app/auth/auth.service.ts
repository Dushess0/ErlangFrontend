import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export const serverUrl = "http://localhost:8080";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  userName: string = "";
  password: string ="";
  rooms: string[]=["Public room"];
  isAuthenticated = false;

  login(name: string, password: string) {
    this.password=password;
    this.http.get<LoginResponse>(`${serverUrl}/user?name=${name}&password=${password}`).subscribe(
      data=>
      {
        this.userName = data.user;
        this.isAuthenticated = data.loggedIn;
        this.rooms=data.rooms||this.rooms;
        this.router.navigate(['/']);
      }
    )
  }


}

export interface LoginResponse {
  loggedIn: boolean,
  user: string,
  rooms: string[];
}