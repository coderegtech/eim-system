import { Component, Input, OnInit } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ProductsComponent } from '../../products.component';
@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.css'],
})
export class AddProductModalComponent implements OnInit {
  faXmark = faXmark;
  @Input() activeModal!: boolean;
  constructor(private productComponent: ProductsComponent) {}

  ngOnInit(): void {}

  onFileChanged(event: Event) {

    const target = event.target as HTMLInputElement;
    target.files
  }

  closeModal() {
    this.productComponent.closeModal();
  }
}
