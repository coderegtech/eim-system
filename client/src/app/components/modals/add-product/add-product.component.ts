import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/services/categories.service';
import { ModalService } from 'src/app/services/modal.service';
import { ProductsService } from 'src/app/services/products.service';
import { SuppliersService } from 'src/app/services/suppliers.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  faXmark = faXmark;
  message: string = '';
  status: string = '';
  activeModal: boolean = false;

  files: File[] = [];
  productForm = new FormGroup({
    productName: new FormControl(''),
    productPrice: new FormControl(''),
    productQuantity: new FormControl(''),
    productDescription: new FormControl(''),
    selectedCategory: new FormControl(''),
    selectedSupplier: new FormControl(''),
  });

  //public modalStateSubscription: Subscription;

  constructor(
    public modalService: ModalService,
    public categoryService: CategoryService,
    public supplierService: SuppliersService,
    public productService: ProductsService,
  ) {
    this.modalService.getModalState().subscribe((state) => {
      this.activeModal = state;
    });
  }

  ngOnInit(): void {
    // suppliers
    this.supplierService.getAllSuppliers().subscribe((res: any) => {
      this.supplierService.suppliers.set(res);
    });

    // categories
    this.categoryService.getAllCategory().subscribe((res: any) => {
      this.categoryService.categories.set(res);
    });
  }

  submitForm(event: Event) {
    event.preventDefault();
    this.productService
      .addProduct(this.productForm.value, this.files[0])
      .subscribe({
        next: (res: any) => {
          if (res.status === 'success') {
            // set data response data to category signal
            this.productService.products.set([
              ...this.productService.products(),
              res.data,
            ]);
            // disable form when process
            this.closeModal();

            // clear input fields
            this.clearInputs();

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res.message,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        },
        error: (error) => {
          console.error(error.message);
        },
      });
  }

  onFilesAdded(event: any) {
    this.files.push(...event.addedFiles);
  }

  onFilesRejected(event: any) {
    console.log(event);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  closeModal() {
    this.modalService.setActiveModal(false);
  }

  clearInputs() {
    this.productForm.reset();
  }
}
