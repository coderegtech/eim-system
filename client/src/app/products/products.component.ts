import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { Category, Product } from '../types/interface.type';
import { ProductsService } from './products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  title = 'Products';
  @Input() isLoading = signal(false);
  categories: Category[] = [];
  @Input() products = signal<Product[]>([]);
  @Input() productsCount = computed(() => this.products().length);

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

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    // fetch data

    this.getCategories();
    this.getProducts();
    this.searchProduct();
  }

  async getProducts() {
    this.isLoading.set(true);
    return await this.productsService.getAllProducts().subscribe((products) => {
      this.products.set(products);
      this.isLoading.set(false);

      console.log(products);
    });
  }

  async getCategories() {
    await this.productsService
      .getCategories()
      .subscribe((category) => (this.categories = category));
  }

  async searchProduct() {
    await this.productsService
      .searchProduct(this.searchProductsInput)
      .subscribe((products) => {
        console.log(products);
        this.products.set(products);
        // this.products = products;
      });
  }

  getInputValue(value: string) {
    console.log(value);

    this.searchProductsInput = value;
  }
}
