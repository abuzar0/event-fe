import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpService: HttpService) { }

  registerUser(body: any) {
    return this._httpService.post('/auth/register', body)
  }

  loginUser(body: any) {
    return this._httpService.post('/auth/login', body)
  }

  getUserList(){
    return this._httpService.get('/auth/register')
  }
}
