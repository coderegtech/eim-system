import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../services/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  customersCount: number = 0;

  tableHeadNames: string[] = [
    'Customer Profile',
    'Name',
    'Email',
    'Address',
    'Phone Number',
    'City',
    'Postal Code',
    'Country',
  ];
  dataItems: any[] = [
    'name',
    'email',
    'address',
    'phoneNumber',
    'city',
    'postalCode',
    'country',
  ];

  constructor(public customerService: CustomersService) {}

  ngOnInit(): void {
    this.getCustomers();

    // customers count
    this.customerService.customersCount().subscribe((res: any) => {
      this.customersCount = res;
    });
  }

  getCustomers() {
    this.customerService.getAllCustomers().subscribe((res: any) => {
      this.customerService.customers.set(res);
    });
  }
}
