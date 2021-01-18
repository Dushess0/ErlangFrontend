import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private auth: AuthService) {
    this.username = "";
    this.password = "";
  }

  username: string;
  password: string;

  ngOnInit(): void {
  }
  login() {
    if (this.username && this.password) {
      this.auth.login(this.username, this.password);
    }
  }
  register() {
    if (this.username && this.password)
      this.auth.login(this.username, this.password);
  }

}
