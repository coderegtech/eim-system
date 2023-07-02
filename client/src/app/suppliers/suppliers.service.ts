import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Supplier } from '../types/interface.type';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  private baseUrl = 'http://localhost:3000/suppliers';
  constructor(private http: HttpClient) {}

  getAllSuppliers(): Observable<Supplier[]> {
    return this.http
      .get<Supplier[]>(this.baseUrl)
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
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
