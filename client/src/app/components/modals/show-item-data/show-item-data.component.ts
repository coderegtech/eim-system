import { Component, effect, Input, OnInit } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from 'src/app/services/modal.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-show-item-data',
  templateUrl: './show-item-data.component.html',
  styleUrls: ['./show-item-data.component.css']
})
export class ShowItemDataComponent implements OnInit {
faXmark = faXmark;
  activeModal: boolean = false;
  isLoading: boolean = false;
  @Input() selectedId?: number;

  constructor(
    public modalService: ModalService,
    public productService: ProductsService
  ) {
    effect(() => {
       console.log(this.selectedId)
    })
   
  }
  ngOnInit(): void {}

   closeModal() {
    this.modalService.setActiveModal(false);
  }
}
