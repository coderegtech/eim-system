import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/categories/categories.service';
import { ModalService } from 'src/app/services/modal.service';
import { SuppliersService } from 'src/app/suppliers/suppliers.service';
import { Category, Supplier } from 'src/app/types/interface.type';
import { ProductsService } from '../../products.service';
@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.css'],
})
export class AddProductModalComponent implements OnInit {
  faXmark = faXmark;
  message: string = '';
  status: string = '';
  categories: Category[] = [];
  suppliers: Supplier[] = [];
  activeModal: boolean = false;

  files: File[] = [];
  applyForm = new FormGroup({
    productName: new FormControl(''),
    productPrice: new FormControl(''),
    productQuantity: new FormControl(''),
    productDescription: new FormControl(''),
    selectedCategory: new FormControl(''),
    selectedSupplier: new FormControl(''),
  });

  private modalStateSubscription: Subscription;

  constructor(
    private modalService: ModalService,
    private categoryService: CategoryService,
    private supplierService: SuppliersService,
    private productService: ProductsService
  ) {
    this.modalStateSubscription = this.modalService
      .getModalState()
      .subscribe((state) => {
        this.activeModal = state;
      });
  }

  ngOnInit(): void {
    console.log(this.files);

    // suppliers
    this.supplierService.getAllSuppliers().subscribe((suppliers) => {
      this.suppliers = suppliers;
    });

    // categories
    this.categoryService.getAllCategory().subscribe((categories) => {
      this.categories = categories;
    });
  }

  submitForm(event: Event) {
    event.preventDefault();
    this.productService
      .addProduct(this.applyForm.value, this.files[0])
      .subscribe((products) => {
        console.log(products);
      });
    console.log(this.applyForm.value);
    console.log(this.files);
  }

  onFilesAdded(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onFilesRejected(event: any) {
    console.log(event);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  closeModal() {
    this.modalService.setActiveModal(false);
  }
}
