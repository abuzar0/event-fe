import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private _httpService: HttpService) { }


  getEventsList() {
    return this._httpService.get('/event/list');
  }

  createEvent(body: any) {
    return this._httpService.post('/event/create', body);
  }

  joinEvent(body: any) {
    return this._httpService.post('/event/join', body);
  }

  approvedEvent(id: string, body: any) {
    return this._httpService.patch(`/event/approved/${id}`, body);
  }

  deleteEvent(id: string) {
    return this._httpService.delete(`/event/approved/${id}`);
  }
}
