import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';

import {LoginComponent} from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category/category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { BrandComponent } from './brand/brand.component';
import { ProductComponent } from './product/product.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpInterceptorService } from '../app/services/http-interceptor/http-interceptor.service';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddSubCategoryComponent } from './add-sub-category/add-sub-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CartComponent } from './cart/cart.component';
import { SearchInvoiceComponent } from './search-invoice/search-invoice.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { AddCartComponent } from './add-cart/add-cart.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataListComponent } from './data-list/data-list.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import {MaterialModule} from './material.module';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
 
    LoginComponent,
      DashboardComponent,
      CategoryComponent,
      SubCategoryComponent,
      BrandComponent,
      ProductComponent,
      AddBrandComponent,
      AddCategoryComponent,
      AddSubCategoryComponent,
      AddProductComponent,
      ChangePasswordComponent,
      CartComponent,
      SearchInvoiceComponent,
      CustomerDetailsComponent,
      AddCartComponent,
      InventoryComponent,
      DataListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxDatatableModule,
    MaterialModule,
    BsDatepickerModule,
    ModalModule,
    AutocompleteLibModule,
    NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule,
    ToastrModule.forRoot({
      timeOut: 3000,
    	preventDuplicates: true,
      maxOpened: 1
    }),
   
  ],
  providers: [
    {
			provide: HTTP_INTERCEPTORS,
			useClass: HttpInterceptorService,
			multi: true
		},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
