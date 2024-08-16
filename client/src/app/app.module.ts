import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertboxComponent } from './components/alertbox/alertbox.component';
import { DatetimeComponent } from './components/datetime/datetime.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MainscreenComponent } from './components/mainscreen/mainscreen.component';
import { AddCategoryComponent } from './components/modals/add-category/add-category.component';
import { AddCustomerComponent } from './components/modals/add-customer/add-customer.component';
import { AddProductComponent } from './components/modals/add-product/add-product.component';
import { AddSupplierComponent } from './components/modals/add-supplier/add-supplier.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsComponent } from './pages/products/products.component';
import { SuppliersComponent } from './pages/suppliers/suppliers.component';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/categories.service';
import { CustomersService } from './services/customers.service';
import { ModalService } from './services/modal.service';
import { OrdersService } from './services/orders.service';
import { ProductsService } from './services/products.service';
import { SuppliersService } from './services/suppliers.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HeaderComponent,
    SideNavComponent,
    OrdersComponent,
    DashboardComponent,
    SuppliersComponent,
    DatetimeComponent,
    AlertboxComponent,
    NotfoundComponent,
    MainscreenComponent,
    CategoriesComponent,
    CustomersComponent,
    LoaderComponent,
    AddProductComponent,
    AddCategoryComponent,
    AddSupplierComponent,
    AddCustomerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthService,
    OrdersService,
    SuppliersService,
    ProductsService,
    CustomersService,
    ModalService,
    CategoryService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
