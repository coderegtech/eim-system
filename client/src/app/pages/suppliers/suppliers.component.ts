import { Component, effect, OnInit } from '@angular/core';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { ErrorType } from 'src/app/types/interface.type';
import { toastify } from 'src/app/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
})
export class SuppliersComponent implements OnInit {
  suppliersCount: number = 0;
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

  constructor(public supplierService: SuppliersService) {
    effect(() => {
      this.supplierService.suppliers();

      // data count
      this.supplierService.supplierCount().subscribe((res: any) => {
        this.suppliersCount = res;
      });
    });
  }

  ngOnInit(): void {
    this.getAllSuppliers();
  }

  getAllSuppliers() {
    this.supplierService.getAllSuppliers().subscribe((res: any) => {
      this.supplierService.suppliers.set(res);
    });
  }

  removeSupplier(id: number) {
     toastify("Supplier deleted", () => {
    this.supplierService.deleteSupplier(id).subscribe({
      next: (res: any) => {
      if (res.status === 'success') {
          // filter current data to remove the specific item
          this.supplierService.suppliers.update(() =>
            this.supplierService.suppliers().filter((item) => item.id !== id),
          );
      }
    } , error: (error: ErrorType) => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: error.message,
              showConfirmButton: false,
              timer: 2000,
            });
          }});
        });

  }

  editSupplier(id: number) {}

  getInputValue(value: string) {
    this.searchProductsInput = value;
  }
}
