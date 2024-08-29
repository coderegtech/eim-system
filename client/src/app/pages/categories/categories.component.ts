import { Component, effect, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/categories.service';
import { ErrorType } from 'src/app/types/interface.type';
import { toastify } from 'src/app/utils';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoriesCount: number = 0;
  isLoading = false;
  message: string = '';
  status: string = '';
  tableHeadNames: string[] = ['Category Name', 'Description'];
  dataItems: any[] = ['name', 'description'];

  searchProductsInput!: string;

  constructor(public categoryService: CategoryService) {
    effect(() => {
      this.categoryService.categories();

      // data count
      this.categoryService.categoryCount().subscribe((res: any) => {
        this.categoriesCount = res;
      });
    });
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    this.isLoading = true;

    // fetch categories
    this.categoryService.getAllCategory().subscribe((res: any) => {
      this.categoryService.categories.set(res);
      this.isLoading = false;
    });
  }

  async searchCategory() {
    this.isLoading = true;
    // get Searched data
    await this.categoryService
      .getCategory(this.searchProductsInput)
      .then((res: any) => {
        this.categoryService.categories.update(() => res);
        this.isLoading = false;
      })
      .catch((err: any) => {
        //  if no category found
        this.categoryService.categories.update(() => []);
        this.isLoading = false;
      });
  }

  removeCategory(id: number) {
     toastify('Category deleted', () => {
       this.categoryService.deleteCategory(id).subscribe({
      next: (res: any) => {
      if (res) {
       
          // filter current data to remove the specific item
          this.categoryService.categories.update(() =>
            this.categoryService.categories().filter((item) => item.id !== id),
          );
      }
    },  error: (error: ErrorType) => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: error.message,
              showConfirmButton: false,
              timer: 2000,
            });
          },});
        });

  }

  editCategory(id: number) {
    alert(id);
  }

  getInputValue(value: string) {
    this.searchProductsInput = value;
    this.searchCategory();
  }
}
