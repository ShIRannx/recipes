import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { User } from './auth.model';
import { AutoBind } from '../shared/helpers';
import { environment } from '../../environments/environment';

interface AuthResponseData {
  email: string;
  idToken: string;
  localId: string;
  expiresIn: string;
  refreshToken: string;
  registered?: boolean;
}

interface AuthFormData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  FIREBASE_URL = 'https://identitytoolkit.googleapis.com/v1';
  SIGNUP_ENDPOINT = `${this.FIREBASE_URL}/accounts:signUp`;
  SIGNIN_ENDPOINT = `${this.FIREBASE_URL}/accounts:signInWithPassword`;

  // Differ from Subject, BehaviorSubject will save the last value emitted, then emit it once a new subscriber subscribe it
  // A new subscription of plain Subject will only get the value of the plain Subject emitted later
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.loadLocalCredential();
  }

  signIn(formData: AuthFormData) {
    return this.http
      .post<AuthResponseData>(
        `${this.SIGNIN_ENDPOINT}`,
        { ...formData, returnSecureToken: true },
        {
          params: {
            key: environment.firebaseApiKey,
          },
        }
      )
      .pipe(catchError(this._errorHandler), tap(this._handleAuthentication));
  }

  signUp(formData: AuthFormData) {
    return this.http
      .post<AuthResponseData>(
        `${this.SIGNUP_ENDPOINT}`,
        { ...formData, returnSecureToken: true },
        {
          params: {
            key: environment.firebaseApiKey,
          },
        }
      )
      .pipe(catchError(this._errorHandler), tap(this._handleAuthentication));
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('credential');
    this.router.navigate(['/authentication']);
  }

  loadLocalCredential() {
    const plainUserObj: {
      id: string;
      email: string;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(localStorage.getItem('credential') ?? '{}');
    const user = plainToInstance(User, plainUserObj);
    if (!user?.token) return;
    this.user.next(user);
  }

  private _errorHandler(err: HttpErrorResponse) {
    return throwError(
      () => new Error(err.error?.error?.message ?? 'Unknow Error Occurred!')
    );
  }

  @AutoBind()
  private _handleAuthentication(authInfo: AuthResponseData) {
    const { localId, email, idToken, expiresIn } = authInfo;
    const expirationDate = new Date(Date.now() + +expiresIn * 1000);
    const user = new User(localId, email, idToken, expirationDate);
    this.user.next(user);
    localStorage.setItem('credential', JSON.stringify(user));
  }
}
