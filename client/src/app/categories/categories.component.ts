import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { Category } from '../types/interface.type';
import { CategoryService } from './categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories = signal<Category[]>([]);
  @Input() categoriesCount = computed(() => this.categories().length);
  isLoading = signal(false);
  tableHeadNames: string[] = ['Category Name', 'Description'];
  dataItems: any[] = ['name', 'description'];

  searchProductsInput!: string;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {


    // fetch categories
    this.categoryService.getAllCategory().subscribe((categories) => {
      this.categories.set(categories);
      console.log(categories);
    });

  }


  removeCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe((res) => {
      alert("Category removed")
      console.log(res);

    })
  }

  editCategory(id: number) {
    alert("updated category" + id)
  }


  getInputValue(value: string) {
    this.searchProductsInput = value;
  }
}
