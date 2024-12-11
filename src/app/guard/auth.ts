import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Check for access token in cookies
    const accessToken = localStorage.getItem('userId');

    if (accessToken) {
      return true;  // If token exists, allow navigation
    } else {
      this.router.navigate(['/authentication/login']);
      return false;
    }
  }

}
