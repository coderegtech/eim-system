import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/services/categories.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {
  faXmark = faXmark;
  activeModal: boolean = false;
  message: string = '';
  status: string = '';
  categoryForm = new FormGroup({
    categoryName: new FormControl(''),
    categoryDescription: new FormControl(''),
  });

  constructor(
    public categoryService: CategoryService,
    public modalService: ModalService,
  ) {
    this.modalService.getModalState().subscribe((state) => {
      this.activeModal = state;
    });
  }

  submitForm(event: Event) {
    event.preventDefault();

    this.categoryService
      .addCategory(this.categoryForm.value)
      .subscribe((res: any) => {
        // set data response data to category signal
        this.categoryService.categories.set([
          ...this.categoryService.categories(),
          res.data,
        ]);
        // disable form when process
        this.closeModal();

        // clear input fields
        this.clearInputs();

        Swal.fire({
          position: 'center',
          icon: res.status,
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
    this.categoryForm.reset();
  }
}
