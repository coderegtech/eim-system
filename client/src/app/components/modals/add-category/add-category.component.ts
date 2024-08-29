import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/services/categories.service';
import { ModalService } from 'src/app/services/modal.service';
import { ErrorType } from 'src/app/types/interface.type';
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
      .subscribe({ 
        next: (res: any) => {
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
             icon: 'success',
             title: res.message,
             showConfirmButton: false,
             timer: 2000,
           });
      }, error: (error: ErrorType) => {
        Swal.fire({
             position: 'center',
             icon: 'error',
             title: error.message,
             showConfirmButton: false,
             timer: 2000,
           });
      }});
  }

  closeModal() {
    this.modalService.setActiveModal(false);
  }

  clearInputs() {
    this.categoryForm.reset();
  }
}
