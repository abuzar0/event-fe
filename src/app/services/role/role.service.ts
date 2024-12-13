import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { IRole } from 'src/app/utils/types/IRole';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private _httpService: HttpService) { }

  getRoles() {
    return this._httpService.get('/role/list');
  }

  createRoles(body: Partial<IRole>) {
    return this._httpService.post('/role/create', body)
  }

  updateRoles(id: string, body: Partial<IRole>) {
    return this._httpService.patch(`/role/${id}`, body)
  }
}
