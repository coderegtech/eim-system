import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { CategoryService } from '../services/categories.service';
import { Category } from '../types/interface.type';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories = signal<Category[]>([]);
  @Input() categoriesCount = computed(() => this.categories().length);
  isLoading = false;
  tableHeadNames: string[] = ['Category Name', 'Description'];
  dataItems: any[] = ['name', 'description'];

  searchProductsInput!: string;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.isLoading = true
    // get Searched data
    // this.categoryService.getCategory(this.searchProductsInput).subscribe((res: any) => {
    //   console.log(res)
    //       this.isLoading.set(false)
    // });
    


    // fetch categories
    this.categoryService.getAllCategory().subscribe((categories) => {
      this.categories.set(categories);
      console.log(categories)
          this.isLoading = false
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
