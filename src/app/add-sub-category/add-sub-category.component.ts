import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service/http-service.service';
import {environment} from 'src/environments/environment';
import {ActivatedRoute, Router} from '@angular/router'
import { isBlank, validateAllFormFields } from '../services/utils/utils';
import { NotificationService } from '../services/notification-service/notification.service';


@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss']
})
export class AddSubCategoryComponent implements OnInit {
  subCategoryForm:FormGroup;
  categoryList:any;
  subCategoryID;
  subCategoryStatus;
  subCategoryN;
  CategoryID;
  submitted = false;


  static readonly updateSubCategory = `/subCategory/{id}`;

  constructor(private fb:FormBuilder, private notificationService:NotificationService,
    private httpService: HttpService, private router:Router, private activateRoute: ActivatedRoute) {
    this.subCategoryForm = this.fb.group({
      id:null,
      subCategoryName:['', Validators.required],
      CategoryName:['', Validators.required],

    })
    this.activateRoute.queryParams.subscribe((params) => {
      this.subCategoryID = params['id'];
      this.subCategoryN = params['name'];
      this.subCategoryStatus = params['status'];
      this.CategoryID = params['categoryId'];


    });
   }

  ngOnInit(): void {
   this.getSubCategory();
   this.subCategoryForm.patchValue({
    id:this.subCategoryID,
    subCategoryName: this.subCategoryN, 
    CategoryName: !isBlank(this.CategoryID) ? this.CategoryID : '',
   
  })

  }
  getSubCategory(){
    this.httpService.doGet('category').subscribe((result) => {
      this.categoryList =result?.categories;
    })
  }
  postSubCategory(){
    if(this.subCategoryForm.valid){
      let payload = {
        id:this.subCategoryForm.get('id').value,
        subCategory_name: this.subCategoryForm.get('subCategoryName').value,
        category_id: this.subCategoryForm.get('CategoryName').value,
        status:this.subCategoryStatus 
      }
      if(!isBlank(payload['id'])){ 
        this.httpService.doPut(AddSubCategoryComponent.updateSubCategory.replace(/{id}/g, this.subCategoryID), payload ).subscribe((result)=>{
          if (result.message) {
            this.notificationService.showSucessNotification('', result.message)
            this.router.navigate(['/sub-category'])
          }else{
            this.notificationService.showSucessNotification('', result.errorMessage)
          }
        })
         
        }else{
          this.httpService.doPost('subCategory', payload).subscribe((result)=>{
            if (result.message) {
              this.notificationService.showSucessNotification('', result.message)
              this.router.navigate(['/sub-category'])
            }else{
              this.notificationService.showSucessNotification('', result.errorMessage)
            }
          })
        
  
        }
    }else{
      validateAllFormFields(this.subCategoryForm)

    }
  
   
  }

   

}
