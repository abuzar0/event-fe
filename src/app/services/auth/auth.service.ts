import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private _httpService: HttpService, private router: Router) { }

  registerUser(body: any) {
    return this._httpService.post('/auth/register', body)
  }

  loginUser(body: any) {
    return this._httpService.post('/auth/login', body)
  }
  refreshToken() {
    return this._httpService.post('/auth/refresh-token', {})
  }
  isAdmin(): boolean {
    const userRole = localStorage.getItem("userRole");
    return userRole === 'admin';
  }

  getUserId(): string {
    return localStorage.getItem("userId") || '';
  }

  logout() {
    this._httpService.post('/auth/logout', {})
      .subscribe((res) => {
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        this.router.navigate(['/authentication/login']);
      })
  }
}
