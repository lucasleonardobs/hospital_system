import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated: boolean = false;
  public authEmitter = new EventEmitter<boolean>()

  constructor(private router: Router) { }

  login(email: string, password: string): boolean {
    if (email === "lukita" && password === "111") {
      this.isAuthenticated = true;
      this.authEmitter.emit(true);
      this.router.navigate(['/']);

      return true
    } else {
      this.isAuthenticated = false;
      this.authEmitter.emit(false);

      return false
    };
  }

  get getIsAuthenticated() {
    return this.isAuthenticated;
  }

  logout(): boolean {
    this.authEmitter.emit(false)
    this.router.navigate(['/login'])

    return false
  }
}