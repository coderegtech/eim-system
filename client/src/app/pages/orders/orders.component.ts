import { Component, OnInit, signal } from '@angular/core';
import { Order } from 'src/app/types/interface.type';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders = signal<Order[]>([]);
  ordersCount: number = 0;
  isLoading = false;
  message: string = '';
  status: string = '';
  tableHeadNames: string[] = [
    'Product Image',
    'Product Name',
    'Price',
    'Quantity',
    'Customer Name',
    'Address',
  ];
  dataItems: any[] = [
    'product.productImg',
    'product.name',
    'product.price',
    'product.quantity',
    'customer.customerProfile',
    'customer.name',
    'customer.address',
  ];

  searchProductsInput!: string;

  ngOnInit(): void {}

  getInputValue(value: string) {
    this.searchProductsInput = value;
  }
}
