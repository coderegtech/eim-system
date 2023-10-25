import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Category } from '../types/interface.type';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:3000/categories';
  constructor(private http: HttpClient) {}

  addCategory(category: any): Observable<Category> {
    return this.http
      .post<Category>(this.baseUrl, {
        name: category.name,
        description: category.description,
      })
      .pipe(catchError(this.handleError));
  }

  getAllCategory(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  deleteCategory(id: number): Observable<Category> {
    return this.http
      .delete<Category>(`${this.baseUrl}/${id}`)
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
