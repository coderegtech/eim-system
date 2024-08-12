import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Customers } from '../types/interface.type';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private baseUrl = 'http://localhost:3000/customers';
  public customers = signal<Customers[]>([]);

  constructor(private http: HttpClient) {}

  customersCount() {
    return this.http
      .get(`${this.baseUrl}/count`)
      .pipe(catchError(this.handleError));
  }

  getAllCustomers(): Observable<Customers[]> {
    return this.http
      .get<Customers[]>(this.baseUrl + '/all')
      .pipe(catchError(this.handleError));
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
