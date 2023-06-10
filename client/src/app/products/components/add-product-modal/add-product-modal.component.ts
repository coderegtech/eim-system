import { Component, OnInit } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/categories/categories.service';
import { ModalService } from 'src/app/services/modal.service';
import { SuppliersService } from 'src/app/suppliers/suppliers.service';
import { Category, Supplier } from 'src/app/types/interface.type';
@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.css'],
})
export class AddProductModalComponent implements OnInit {
  faXmark = faXmark;
  categories: Category[] = [];
  suppliers: Supplier[] = [];
  activeModal: boolean = false;
  private modalStateSubscription: Subscription;

  constructor(
    private modalService: ModalService,
    private categoryService: CategoryService,
    private supplierService: SuppliersService
  ) {
    this.modalStateSubscription = this.modalService
      .getModalState()
      .subscribe((state) => {
        this.activeModal = state;
      });
  }

  ngOnInit(): void {
    // suppliers
    this.supplierService.getAllSuppliers().subscribe((suppliers) => {
      this.suppliers = suppliers;
    });

    // categories
    this.categoryService.getAllCategory().subscribe((categories) => {
      this.categories = categories;
    });
  }

  closeModal() {
    this.modalService.setActiveModal(false);
  }
}
