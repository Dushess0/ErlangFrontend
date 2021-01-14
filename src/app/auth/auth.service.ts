import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export const serverUrl = "http://192.168.194.154:8080";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  userName: string = "";
  isAuthenticated = false;

  login(name: string, password: string) {
    this.http.get<LoginResponse>(`${serverUrl}/user?name=${name}&pass=${password}`).subscribe(
      data=>
      {
        this.userName = data.user;
        this.isAuthenticated = data.loggedIn;
        this.router.navigate(['/']);
      }
    )
  }
  register(name: string, password: string) {
    this.http.get<LoginResponse>(`${serverUrl}/user?name=${name}&pass=${password}`).subscribe(
      data => {
        this.userName = data.user;
        this.isAuthenticated = data.loggedIn;
      }


    )
  }
}

export interface LoginResponse {
  loggedIn: boolean,
  user: string
}