import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorType, Product } from '../types/interface.type';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = 'http://localhost:3000/products';
  public products = signal<Product[]>([]);

  constructor(private http: HttpClient) {}

  addProduct(products: any, files: File): Observable<Product> {
    const formData = new FormData();
    formData.append('productImg', files);
    formData.append('name', products.productName);
    formData.append('price', products.productPrice);
    formData.append('quantity', products.productQuantity);
    formData.append('description', products.productDescription);
    formData.append('supplierId', products.selectedSupplier);
    formData.append('categoryId', products.selectedCategory);

    return this.http
      .post<Product>(this.baseUrl + '/create', formData)
      .pipe(catchError(this.handleError));
  }

  getAllProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.baseUrl + '/all')
      .pipe(catchError(this.handleError));
  }

  searchProduct(name: string): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.baseUrl + `/search?name=${name}`)
      .pipe(catchError(this.handleError));
  }

  filterCategories(category: string): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.baseUrl + `/filter?category=${category}`)
      .pipe(catchError(this.handleError));
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http
      .delete<Product>(`${this.baseUrl}/delete/${id}`)
      .pipe(catchError(this.handleError));
  }

  productCount() {
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
