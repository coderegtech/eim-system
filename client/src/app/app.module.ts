import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AlertboxComponent } from './components/alertbox/alertbox.component';
import { DatetimeComponent } from './components/datetime/datetime.component';
import { HeaderComponent } from './components/header/header.component';
import { MainscreenComponent } from './components/mainscreen/mainscreen.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AddCategoryModalComponent } from './pages/categories/components/add-category-modal/add-category-modal.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AddProductModalComponent } from './pages/products/components/add-product-modal/add-product-modal.component';
import { ProductsComponent } from './pages/products/products.component';
import { SuppliersComponent } from './pages/suppliers/suppliers.component';
import { CategoryService } from './services/categories.service';
import { CustomersService } from './services/customers.service';
import { ModalService } from './services/modal.service';
import { ProductsService } from './services/products.service';


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
    AddCategoryModalComponent,
    LoginComponent,
    SignupComponent,
    CustomersComponent,
    AddProductModalComponent,
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
  providers: [ProductsService, CustomersService, ModalService, CategoryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
