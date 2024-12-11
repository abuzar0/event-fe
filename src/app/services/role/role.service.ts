import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private _httpService:HttpService) { }

  getRoles(){
    return this._httpService.get('/role/list');
  }
}
