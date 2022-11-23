import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category/category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { BrandComponent } from './brand/brand.component';
import { ProductComponent } from './product/product.component';
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
import { DataListComponent } from './data-list/data-list.component';


const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },

	{
		path: 'login', component: LoginComponent
	},
	{
		path: 'data', component: DataListComponent
	},



	{
		path: '',
		component: LayoutComponent,
		children: [

			{
				path: 'dashboard',
				component: DashboardComponent
			},
			{
				path: 'inventory',
				component: InventoryComponent
			},
			{
				path: 'category',
				component: CategoryComponent
			},
			{
				path: 'sub-category',
				component: SubCategoryComponent
			},
			{
				path: 'brand',
				component: BrandComponent
			},
			{
				path: 'product',
				component: ProductComponent
			},
			{
				path: 'addBrand',
				component: AddBrandComponent
			},
			{
				path: 'addCategory',
				component: AddCategoryComponent
			},
			{
				path: 'addSubCategory',
				component: AddSubCategoryComponent
			},
			{
				path: 'addProduct',
				component: AddProductComponent
			},
			{
				path: 'cart',
				component: CartComponent
			},
			{
				path: 'searchInvoice',
				component: SearchInvoiceComponent
			},

			
			{
				path: 'changePassword',
				component: ChangePasswordComponent
			},
			
			{
				path: 'customerDetails',
				component: CustomerDetailsComponent
			},
			{
				path: 'addCart',
				component: AddCartComponent
			},





		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
