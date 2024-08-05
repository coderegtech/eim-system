import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { toastify } from 'src/app/utils';
import { CategoryService } from '../../services/categories.service';
import { Category } from '../../types/interface.type';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories = signal<Category[]>([]);
  @Input() categoriesCount = computed(() => this.categories().length);
  isLoading = false;
  message: string = '';
  status: string = '';
  tableHeadNames: string[] = ['Category Name', 'Description'];
  dataItems: any[] = ['name', 'description'];

  searchProductsInput!: string;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    this.isLoading = true;

    // fetch categories
    this.categoryService.getAllCategory().subscribe((categories) => {
      this.categories.set(categories);
      this.isLoading = false;
    });
  }

  searchCategory() {
    this.isLoading = true;
    // get Searched data
    this.categoryService
      .getCategory(this.searchProductsInput)
      .subscribe((category: any) => {
        if (!category) {
          this.status = 'error';
          this.message = 'No Category found';
        }

        // push response object data to array
        const data = [];
        data.push(category);
        console.log(category);
        this.categories.set(data);
        this.isLoading = false;
      });
  }

  removeCategory(id: number) {
          toastify("Category deleted", "", () => {
            this.categoryService.deleteCategory(id).subscribe((res: any) => {
            if (res) {
              // filter current data to remove the specific item
              this.categories.update(() => this.categories().filter(item => item.id !== id));
            }
          })
          })
      
  }

  editCategory(id: number) {}

  getInputValue(value: string) {
    this.searchProductsInput = value;
    this.searchCategory();
  }
}
