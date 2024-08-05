import { Component, Input, OnInit } from '@angular/core';

import { CategoryService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { Category, Product } from '../../types/interface.type';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  title = 'Products';
  @Input() isLoading = false;
  categories: Category[] = [];
  @Input() products: Product[] = [];

  searchProductsInput!: string;

  tableHeadNames: string[] = [
    'Product Image',
    'Name',
    'Price',
    'Quantity',
    'Description',
    'Category',
    'Supplier',
  ];
  dataItems: any[] = [
    'name',
    'price',
    'quantity',
    'description',
    'category',
    'Supplier',
  ];

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoryService
  ) {
    categoriesService
      .getAllCategory()
      .subscribe((categories) => (this.categories = categories));
  }

  ngOnInit(): void {
    // fetch data
    this.getProducts();
  }

  async getProducts() {
    this.productsService.getAllProducts().subscribe((products) => {
      this.products = products;

      console.log(products);
    });
  }

  getInputValue(value: string) {
    this.productsService.searchProduct(value).subscribe((products) => {
      if (products) {
        this.products = products;
      }
      console.log(products);
    });
  }
}
