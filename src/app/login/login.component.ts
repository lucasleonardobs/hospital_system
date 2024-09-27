import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public loginValid = true;
  public email = '';
  public password = '';
  public hide_password = true;

  constructor(private authService: AuthService) { };

  onSubmit(): void {
    this.loginValid = this.authService.login(this.email, this.password)
  }

  ngOnInit(): void {
  };
}