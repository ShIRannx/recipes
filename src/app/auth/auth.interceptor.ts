import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { exhaustMap, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user =>
        next.handle(
          user?.token
            ? request.clone({
                params: new HttpParams().set('auth', user.token),
              })
            : request
        )
      )
    );
  }
}
