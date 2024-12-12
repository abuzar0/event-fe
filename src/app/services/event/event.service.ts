import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { IEvent } from 'src/app/utils/types/IEvent';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private _httpService: HttpService) { }


  getEventsList({ limit, page }: { limit: number, page: number }, query?: string) {
    let url = `/event/list?page=${page}&limit=${limit}`;
    if (query) {
      url += `&search=${encodeURIComponent(query)}`;
    }
    return this._httpService.get(url);
  }

  createEvent(body: Partial<IEvent>) {
    return this._httpService.post('/event/create', body);
  }

  joinEvent(body: Partial<IEvent>) {
    return this._httpService.post('/event/join', body);
  }

  approvedEvent(id: string, body: Partial<IEvent>) {
    return this._httpService.patch(`/event/approved/${id}`, body);
  }

  deleteEvent(id: string) {
    return this._httpService.delete(`/event/${id}`);
  }
}
