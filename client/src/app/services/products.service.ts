import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from '../types/interface.type'

interface newProductType {
  file: File;
  name: string;
  price: number;
  description: string;
  quantity: number;
  categoryId: number;
  supplierId: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  addProduct(products: any, files: File): Observable<Product> {
    const {
      productName,
      productPrice,
      productQuantity,
      productDescription,
      selectedCategory,
      selectedSupplier,
    } = products;

    const newProduct: newProductType = {
      file: files,
      name: productName,
      price: productPrice,
      quantity: productQuantity,
      description: productDescription,
      supplierId: selectedSupplier,
      categoryId: selectedCategory,
    };

    return this.http
      .post<Product>(this.baseUrl + '/products/addProduct', newProduct)
      .pipe(catchError(this.handleError));
  }
   
  getAllProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.baseUrl + '/products')
      .pipe(catchError(this.handleError));
  }

  searchProduct(name: string): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.baseUrl + `/products/search?name=${name}`)
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
