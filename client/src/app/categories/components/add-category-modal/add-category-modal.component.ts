import { Component } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.css'],
})
export class AddCategoryModalComponent {
  faXmark = faXmark;
}
