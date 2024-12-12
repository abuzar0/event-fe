import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request and set `withCredentials` to true
    const clonedRequest = req.clone({
      withCredentials: true // Include cookies in cross-origin requests
    });

    // Pass the modified request to the next handler
    return next.handle(clonedRequest);
  }
}
