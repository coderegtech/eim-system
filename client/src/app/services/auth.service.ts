import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../types/interface.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  loginUser(username: string, password: string): Observable<User> {
    return this.http
      .post<User>(this.baseUrl + '/auth/login', { username, password })
      .pipe(catchError(this.handleError));
  }

  createUser(username: string, password: string) {
    return this.http
      .post<User>(this.baseUrl + '/auth/signup', { username, password })
      .pipe(catchError(this.handleError));
  }

  logoutUser() {
    return this.http
      .post(this.baseUrl + '/auth/logout', {})
      .pipe(catchError(this.handleError));
  }

  isLoggedIn() {
    return false;
  }

  isLoggedOut() {
    return true;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error,
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.'),
    );
  }
}
