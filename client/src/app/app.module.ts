import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryService } from './categories/categories.service';
import { AddCategoryModalComponent } from './categories/components/add-category-modal/add-category-modal.component';
import { AlertboxComponent } from './components/alertbox/alertbox.component';
import { DatetimeComponent } from './components/datetime/datetime.component';
import { HeaderComponent } from './components/header/header.component';
import { MainscreenComponent } from './components/mainscreen/mainscreen.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomersService } from './customers/customers.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { OrdersComponent } from './orders/orders.component';
import { AddProductModalComponent } from './products/components/add-product-modal/add-product-modal.component';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from './products/products.service';
import { ModalService } from './services/modal.service';
import { SuppliersComponent } from './suppliers/suppliers.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HeaderComponent,
    SideNavComponent,
    AddProductModalComponent,
    OrdersComponent,
    CustomersComponent,
    DashboardComponent,
    SuppliersComponent,
    DatetimeComponent,
    AlertboxComponent,
    NotfoundComponent,
    MainscreenComponent,
    CategoriesComponent,
    AddCategoryModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
  ],
  providers: [ProductsService, CustomersService, ModalService, CategoryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
