import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  get(url: string) {
    return this._http.get(environment.baseUrl + url)
  }
  post(url: string, body: any) {
    return this._http.post(environment.baseUrl + url, body)
  }

  patch(url: string, body: any) {
    return this._http.patch(environment.baseUrl + url, body)
  }
  delete(url: string) {
    return this._http.delete(environment.baseUrl + url)
  }
}
