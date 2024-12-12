import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private _httpService: HttpService) { }

  registerUser(body: any) {
    return this._httpService.post('/auth/register', body)
  }

  loginUser(body: any) {
    return this._httpService.post('/auth/login', body)
  }
  refreshToken(){
    return this._httpService.post('/auth/refresh-token',{})
  }
  isAdmin(): boolean {
    const userRole = localStorage.getItem("userRole");
    return userRole === 'admin';
  }

  getUserId(): string | undefined {
    return localStorage.getItem("userId") ?? undefined;
  }

  logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
  }
}
