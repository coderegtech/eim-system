import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { SuppliersComponent } from './suppliers/suppliers.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'customers',
    component: CustomersComponent,
  },
  {
    path: 'suppliers',
    component: SuppliersComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
