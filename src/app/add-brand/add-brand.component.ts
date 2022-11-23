import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service/http-service.service';
import {environment} from 'src/environments/environment';
import {ActivatedRoute, Router} from '@angular/router'
import { HttpParams } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { isBlank, validateAllFormFields } from '../services/utils/utils';


@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent implements OnInit {
  brnadForm:FormGroup;
  brandID;
  brandN;
  brandStatus;
  submitted = false;
  static readonly updateBrand = `/brand/{id}`;


  constructor(private fb:FormBuilder,private notificationService:NotificationService, private httpService: HttpService, private router:Router, private activateRoute: ActivatedRoute) {
    this.brnadForm = this.fb.group({
      id:null,
      brandName:['',Validators.required]

    })
    
    this.activateRoute.queryParams.subscribe((params) => {
      console.log(params)
      this.brandID = params['id'];
      this.brandN = params['name'];
      this.brandStatus = params['status']
    });
   }

  ngOnInit(): void {
    this.brnadForm.patchValue({
      brandName: this.brandN, 
      id:this.brandID
    })
  }
  postBrand(){
    if(this.brnadForm.valid){
      let payload ={
        id:this.brnadForm.get('id').value,
        brand_name:this.brnadForm.get('brandName').value,
        status:this.brandStatus 
      }
      console.log(payload)
      if(!isBlank(payload['id'])){ 
        this.httpService.doPut(AddBrandComponent.updateBrand.replace(/{id}/g, this.brandID), payload ).subscribe((result)=>{
          if (result.message) {
            this.notificationService.showSucessNotification('', result.message)
            this.router.navigate(['/brand'])
          }else{
            this.notificationService.showErrorNotification('', result.errorMessage)
          }
        })
      }else{
        this.httpService.doPost('brand', payload).subscribe((result)=>{
          if (result.message) {
            this.notificationService.showSucessNotification('', result.message)
            this.router.navigate(['/brand'])
          }else{
            this.notificationService.showErrorNotification('', result.errorMessage)
          }
        })
       
      
      }
    }else{
      validateAllFormFields(this.brnadForm)

    }
  
  
  }

}
