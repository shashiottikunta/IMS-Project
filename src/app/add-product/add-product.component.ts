import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service/http-service.service';
import {environment} from 'src/environments/environment';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { NotificationService } from '../services/notification-service/notification.service';
import { Router, ActivatedRoute } from '@angular/router'
import { isBlank, validateAllFormFields } from '../services/utils/utils';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm:FormGroup;
  subCategoryList;
  categoryList;
  brandList;
  subCategoryList1;
  productName;
  categoryName;
  subCategoryname;
  brandName;
  modalNumber;
  units;
  price;
  dataList;
  productId;
  submitted = false;
  showStatus:Boolean=false;
  statusList=['Active', 'Inactive']

  static readonly getSubCategory = `/subCategoryDD/{id}`;

  static readonly updateProduct = `/product/{id}`;


  constructor(private fb:FormBuilder,private activateRoute: ActivatedRoute,
    private notificationService:NotificationService, private httpService: HttpService, private router:Router) {
    this.productForm = this.fb.group({
      id:null,
      productName:['', Validators.required],
      categoryName:['', Validators.required],
      subCategoryName:['', Validators.required],
      brandName:['', Validators.required],
      modalNumber:[''],
      stock:['', Validators.required],
      price:['', Validators.required],
      status:['']
      

    })

    this.activateRoute.queryParams.subscribe((params) => {
      this.dataList =params
      console.log(this.dataList)
      this.productId = params['id'];
      this.productName = params['productName'];
      this.categoryName = params['categoryName'];
      this.subCategoryname = params['subCategory'];
      this.brandName = params['brand'];
      this.modalNumber =params['id'];
      this.units=params['units'];
      this.price=params['price'];
    });
   }

  ngOnInit(): void {
    this.getSubCategoryall();
    this.getCategory();
    this.getBrand();
    this.productForm.patchValue({
      id:this.productId,
      productName: !isBlank(this.productName) ? this.productName : '',
      categoryName: !isBlank(this.categoryName) ? this.categoryName : '',
      subCategoryName:!isBlank(this.subCategoryname) ? this.subCategoryname : '',
      brandName:!isBlank(this.brandName) ? this.brandName : '',
      modalNumber:this.modalNumber,
      stock:this.units,
      price:this.price,
      status:!isBlank(this.dataList?.status) ? this.dataList?.status : '',
    })
    if(this.dataList.id !== null){
      this.showStatus = true
    }
    
  }

  getCategory(){
    this.httpService.doGet('category').subscribe((result) => {
      this.categoryList =result?.categories;
      console.log(result)
    })
  }
  getBrand(){
    this.httpService.doGet('brand').subscribe((result) => {
      this.brandList =result?.brands;
      console.log(result)
    })


  }
  getSubCategoryall(){
    this.httpService.doGet('subCategory').subscribe((result) => {
      this.subCategoryList = result;
      this.subCategoryList1 =this.subCategoryList?.sub_categories
    })
  }
  getSubCategory(name){
    this.httpService.doGetWith(AddProductComponent.getSubCategory.replace(/{id}/g, name)).subscribe((result) => {
    this.subCategoryList = result;
    this.subCategoryList1 =this.subCategoryList?.sub_categories
    })


  }
  postProduct(){
    if(this.productForm.valid){
      let payload ={
        id:this.productForm.get('id').value,
        name: this.productForm.get('productName').value,
        brand_id:  this.productForm.get('brandName').value,
        category_id:  this.productForm.get('categoryName').value,
        sub_category_id:  this.productForm.get('subCategoryName').value,
        units:  this.productForm.get('stock').value,
        price:  this.productForm.get('price').value,
        model_number:  this.productForm.get('modalNumber').value,
        remaining_units:  '0',
        status:  this.productForm.get('status').value,

      }
      if (!isBlank(payload['id'])) {
        this.httpService.doPut(AddProductComponent.updateProduct.replace(/{id}/g, this.productId ), payload ).subscribe((result)=>{
          if (result.message) {
            this.notificationService.showSucessNotification('', result.message)
            this.router.navigate(['/product'])
          }else{
            this.notificationService.showSucessNotification('', result.errorMessage)
          }
        })
    
    }
    else{
      this.httpService.doPost('product', payload).subscribe((result)=>{
        if (result.message) {
          this.notificationService.showSucessNotification('', result.message)
          this.router.navigate(['/product'])
        }else{
          this.notificationService.showSucessNotification('', result.errorMessage)
        }
      })
       
    }
    }else{
      validateAllFormFields(this.productForm)

    }
   

  
  
  }
 

}
