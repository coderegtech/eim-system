import { Component, effect, OnInit } from '@angular/core';

import { CategoryService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { ErrorType } from 'src/app/types/interface.type';
import { toastify } from 'src/app/utils';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  title = 'Products';
  isLoading = false;
  productsCount: number = 0;
  searchProductsInput!: string;

  tableHeadNames: string[] = [
    'Product Image',
    'Name',
    'Price',
    'Quantity',
    'Description',
  ];
  dataItems: any[] = ['name', 'price', 'quantity', 'description'];

  constructor(
    public productsService: ProductsService,
    public categoryService: CategoryService,
  ) {
    effect(() => {
      this.productsService.products();

      // products count
      this.productsService.productCount().subscribe((res: any) => {
        this.productsCount = res;
      });
    });
  }

  ngOnInit(): void {
    // fetch data
    this.getProducts();

    // categories
    this.categoryService.getAllCategory().subscribe((res: any) => {
      this.categoryService.categories.set(res);
    });
  }

  getProducts() {
    this.isLoading = true;

    this.productsService.getAllProducts().subscribe((res: any) => {
      this.productsService.products.set(res);
      console.log(res);
      this.isLoading = false;
    });
  }

  removeProduct(id: number) {
    toastify('Product deleted', () => {
      this.productsService.deleteProduct(id).subscribe({
        next: (res: any) => {
          if (res) {
            this.productsService.products.update(() =>
              this.productsService.products().filter((item) => item.id !== id),
            );
          }
        },
        error: (error: ErrorType) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: error.message,
            showConfirmButton: false,
            timer: 2000,
          });
        },
      });
    });
  }

  searchProduct(value: string) {
    this.isLoading = true;

    this.productsService.searchProduct(value).subscribe({
      next: (res: any) => {
        if (res) {
          this.productsService.products.update(() => res);
          this.isLoading = false;
        }
      },
      error: (error: ErrorType) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.message,
          showConfirmButton: false,
          timer: 2000,
        });
      },
    });
  }

  filterByCategory(category: string) {
    this.isLoading = true;

    this.productsService.filterCategories(category).subscribe({
      next: (res: any) => {
        if (res) {
          this.productsService.products.update(() => res);
          this.isLoading = false;
        }
      },
      error: (error: ErrorType) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.message,
          showConfirmButton: false,
          timer: 2000,
        });
      },
    });
  }

  editProduct(id: number) {}
}
