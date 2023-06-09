import { Component, Input } from '@angular/core';
import { Product } from '../../../types/interface.type';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
  isLoading = false;

  @Input() products: Product[] = [];
}
