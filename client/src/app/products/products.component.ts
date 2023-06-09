import { Component, Input, OnInit } from '@angular/core';
import { faCalendarDays, faClock } from '@fortawesome/free-solid-svg-icons';
import { Category, Product } from '../types/interface.type';
import { ProductsService } from './products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  title = 'Products';
  faCalendarDays = faCalendarDays;
  faClock = faClock;
  date = new Date().toLocaleDateString('en-PH', {
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  isLoading = false;
  categories: Category[] = [];
  @Input() products: Product[] = [];

  @Input() addProductModalActive: boolean = true;
  searchProductsInput: string = '';

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
    this.searchProduct();
  }

  async getProducts() {
    this.isLoading = true;
    return await this.productsService.getAllProducts().subscribe((products) => {
      this.products = products;

      this.isLoading = false;
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
        this.products = products;
      });
  }

  activeProductModal() {
    this.addProductModalActive = true;
  }

  closeModal() {
    this.addProductModalActive = false;
  }
}
