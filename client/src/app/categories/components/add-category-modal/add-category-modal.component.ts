import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from 'src/app/services/modal.service';
import { CategoryService } from '../../../services/categories.service';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.css'],
})
export class AddCategoryModalComponent {
  faXmark = faXmark;
  activeModal: boolean = false;
  message: string = '';
  status: string = '';
  categoryForm = new FormGroup({
    categoryName: new FormControl(''),
    categoryDescription: new FormControl(''),
  });

  constructor(
    private categoryService: CategoryService,
    private modalService: ModalService
  ) {
    this.modalService.getModalState().subscribe((state) => {
      this.activeModal = state;
    });
  }

  submitForm(event: Event) {
    event.preventDefault();

    this.categoryService
      .addCategory(this.categoryForm.value)
      .subscribe((category) => {
        console.log(category);
        this.status = 'success';
        this.message = 'Category added!';
      });
  }

  closeModal() {
    this.modalService.setActiveModal(false);
  }
}
