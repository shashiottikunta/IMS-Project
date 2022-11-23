import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service/http-service.service';
import {environment} from 'src/environments/environment';
import {ActivatedRoute, Router} from '@angular/router'
import { HttpParams } from '@angular/common/http';
import { validateAllFormFields } from '../services/utils/utils';


@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddCartComponent implements OnInit {
showProductForm:Boolean=false;
productForm:FormGroup;
productList;
temp: any;
submitted = false;

categoryList:any;
subCategoryList:any;
brandList:any;
productUpdateData =[];
constructor(private fb:FormBuilder, private httpService: HttpService, private router:Router, private activateRoute: ActivatedRoute) {
  this.productForm = this.fb.group({
    productName:[''],
    categoryName:[''],
    subCategoryName:[''],
    brandName:[''],
    modalNumber:[''],
    stock:['',Validators.required],
    price:['',Validators.required],
    id:['']
    

  })
 }

  ngOnInit(): void {
    this.getProduct();
    this.getCategory();
    this.getSubCategory();
    this.getBrand();
  }

  getCategory(){
    this.httpService.doGet('category').subscribe((result) => {
      this.categoryList =result?.categories;
      console.log(result)
    })
  }
  getSubCategory(){
    this.httpService.doGet('subCategory').subscribe((result) => {
      this.subCategoryList =result?.sub_categories;
      console.log(result)
    })
  }
  getBrand(){
    this.httpService.doGet('brand').subscribe((result) => {
      this.brandList =result?.brands;
      console.log(result)
    })


  }

  updateFilter(event) {
		const val = event.target.value.toLowerCase();
		const temp = this.temp.filter(function (d) {
          return d.name.toLowerCase().indexOf(val) !== -1
				|| !val;
		});
    console.log(temp)
    this.showProductForm =true;

    this.productForm.patchValue({
      productName:temp[0]?.name,
      categoryName:temp[0]?.category?.id,
      subCategoryName:temp[0]?.sub_category?.id,
      brandName:temp[0]?.brand?.id,
      modalNumber:temp[0]?.model_number,
      id:temp[0]?.id,
      stock:[''],
      price:[''],

    })
	

	}
  getProduct(){
    this.httpService.doGet('product').subscribe((result) => {
      this.productList =result?.prodcuts;
      this.temp = [...result['prodcuts']];

      console.log(result)
    })
  }

  postProduct(){
    if(this.productForm.valid){
      let payload ={
        id:this.productForm.getRawValue().id,
        name: this.productForm.getRawValue().productName,
        brand_id:  this.productForm.getRawValue().brandName,
        category_id:  this.productForm.getRawValue().categoryName,
        sub_category_id:  this.productForm.getRawValue().subCategoryName,
        units:  Number(this.productForm.get('stock').value),
        price:  Number(this.productForm.get('price').value),
        model_number:  this.productForm.getRawValue().modalNumber,
        remaining_units:  '0'
  
    }
    let productDetails = JSON.parse(localStorage.getItem('names'));
    productDetails.push(payload)
    localStorage.setItem("names", JSON.stringify(productDetails));
    this.router.navigate(['/cart'])
    }else{
      validateAllFormFields(this.productForm)

    }
    }
   


}
