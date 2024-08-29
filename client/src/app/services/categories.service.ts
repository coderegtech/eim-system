import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Category, ErrorType } from '../types/interface.type';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:3000/categories';
  public categories = signal<Category[]>([]);

  constructor(private http: HttpClient) {}

  addCategory(category: any): Observable<Category> {
    return this.http
      .post<Category>(this.baseUrl + '/create', {
        name: category.categoryName,
        description: category.categoryDescription,
      })
      .pipe(catchError(this.handleError));
  }

  getAllCategory(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${this.baseUrl}/all`)
      .pipe(catchError(this.handleError));
  }

  getCategory(name: string) {
    return new Promise<any>((resolve, reject) => {
      this.http.get<Category>(`${this.baseUrl}/search?q=${name}`).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  deleteCategory(id: number): Observable<Category> {
    return this.http
      .delete<Category>(`${this.baseUrl}/delete/${id}`)
      .pipe(catchError(this.handleError));
  }

  categoryCount() {
    return this.http
      .get(`${this.baseUrl}/count`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.

      const serviceError: ErrorType = {
        message: error.error.message,
        statusCode: error.status,
      };

      return throwError(() => serviceError);

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
