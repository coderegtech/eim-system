import { Component, Input, OnInit } from '@angular/core';
import { Supplier } from '../types/interface.type';
import { SuppliersService } from './suppliers.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
})
export class SuppliersComponent implements OnInit {
  @Input() suppliers: Supplier[] = [];

  searchProductsInput!: string;

  tableHeadNames: string[] = [
    'Supplier Name',
    'Contact Name',
    'Phone Number',
    'Email',
    'Address',
    'City',
    'Postal Code',
    'Country',
  ];
  dataItems: any[] = [
    'supplierName',
    'contactName',
    'phoneNumber',
    'email',
    'address',
    'city',
    'postalCode',
    'country',
  ];

  constructor(private supplierService: SuppliersService) {}

  ngOnInit(): void {
    this.getAllSuppliers();
  }

  async getAllSuppliers() {
    await this.supplierService.getAllSuppliers().subscribe((suppliers) => {
      this.suppliers = suppliers;
      console.log(suppliers);
    });
  }

  getInputValue(value: string) {
    this.searchProductsInput = value;
  }
}
