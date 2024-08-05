import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import { Customers } from '../../types/interface.type';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  customers: Customers[] = [];
  tableHeadNames: string[] = [
    'Customer',
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

  constructor(private customerService: CustomersService) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  async getCustomers() {
    await this.customerService.getAllCustomers().subscribe((customers) => {
      this.customers = customers;
      console.log(customers);
    });
  }
}
