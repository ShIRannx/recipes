import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

import { map, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthRouteGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map(user => (user ? this.router.createUrlTree(['/recipes']) : true)),
    );
  }
}
// tap(isAuthorized => {
//   if (!isAuthorized) this.router.navigate(['/authentication']);
// })
