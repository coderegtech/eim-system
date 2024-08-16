import { Component, effect, OnInit } from '@angular/core';

import { CategoryService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { toastify } from 'src/app/utils';
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
    })
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

    // fetch categories
    this.productsService.getAllProducts().subscribe((res: any) => {
      this.productsService.products.set(res);
      this.isLoading = false;
    });
  }

  removeProduct(id: number) {
    this.productsService.deleteProduct(id).subscribe((res: any) => {
      if (res) {
        toastify('Product deleted', () => {
          // filter current data to remove the specific item
          this.productsService.products.update(() =>
            this.productsService.products().filter((item) => item.id !== id),
          );  
        });
      }
    });
  }

  getInputValue(value: string) {
    this.productsService.searchProduct(value).subscribe((res: any) => {
      if (res) {
        this.productsService.products.update(() =>
          this.productsService
            .products()
            .filter((item) => item.name === res.name),
        );
        this.isLoading = false;
      }

      //  if no category found
      this.productsService.products.update(() => []);
      this.isLoading = false;
    });
  }

  editProduct(id: number) {

  }
}
