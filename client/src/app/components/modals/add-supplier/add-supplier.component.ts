import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from 'src/app/services/modal.service';
import { SuppliersService } from 'src/app/services/suppliers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css'],
})
export class AddSupplierComponent {
  faXmark = faXmark;
  activeModal: boolean = false;

  supplierForm = new FormGroup({
    supplierName: new FormControl(''),
    contactName: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    postalCode: new FormControl(''),
    country: new FormControl(''),
  });

  constructor(
    public suppliersService: SuppliersService,
    public modalService: ModalService,
  ) {
    this.modalService.getModalState().subscribe((state) => {
      this.activeModal = state;
    });
  }

  submitForm(event: Event) {
    event.preventDefault();

    this.suppliersService
      .addSupplier(this.supplierForm.value)
      .subscribe((res: any) => {
        // set data response data to supplier signal
        this.suppliersService.suppliers.set([
          ...this.suppliersService.suppliers(),
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
      });
  }

  closeModal() {
    this.modalService.setActiveModal(false);
  }

  clearInputs() {
    this.supplierForm.reset();
  }
}
