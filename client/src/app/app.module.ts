import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertboxComponent } from './components/alertbox/alertbox.component';
import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DatetimeComponent } from './datetime.component';
import { OrdersComponent } from './orders/orders.component';
import { AddProductModalComponent } from './products/components/add-product-modal/add-product-modal.component';
import { ProductsListComponent } from './products/components/products-list/products-list.component';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from './products/products.service';
import { SuppliersComponent } from './suppliers/suppliers.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HeaderComponent,
    SideNavComponent,
    ProductsListComponent,
    AddProductModalComponent,
    OrdersComponent,
    CustomersComponent,
    DashboardComponent,
    SuppliersComponent,
    DatetimeComponent,
    AlertboxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
