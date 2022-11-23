import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service/http-service.service';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router'
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { isBlank, validateAllFormFields } from '../services/utils/utils';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  categorForm: FormGroup;
  categoryID;
  categoryN;
  categoryStatus;
  submitted = false;
  static readonly updateCategory = `/category/{id}`;


  constructor(private fb: FormBuilder, private httpService: HttpService,private notificationService:NotificationService, private router: Router, private activateRoute: ActivatedRoute) {
    this.categorForm = this.fb.group({
      id:null,
      categoryName: ['', Validators.required],

    })
    this.activateRoute.queryParams.subscribe((params) => {
      this.categoryID = params['id'];
      this.categoryN = params['name'];
      this.categoryStatus = params['status']
    });
  }

  ngOnInit(): void {
    this.categorForm.patchValue({
      categoryName: this.categoryN,
      id: this.categoryID
    })
  }
  postCategory() {
    if(this.categorForm.valid){
      let payload = {
        id: this.categorForm.get('id').value,
        category_name: this.categorForm.get('categoryName').value,
        status: this.categoryStatus
      }
      if (!isBlank(payload['id'])) {
        this.httpService.doPut(AddCategoryComponent.updateCategory.replace(/{id}/g, this.categoryID), payload).subscribe((result) => {
          if (result.message) {
            this.notificationService.showSucessNotification('', result.message)
            this.router.navigate(['/category'])
          }else{
            this.notificationService.showErrorNotification('', result.errorMessage)
          }
        })
      } else {
        this.httpService.doPost('category', payload).subscribe((result) => {
          if (result.message) {
            this.notificationService.showSucessNotification('', result.message)
            this.router.navigate(['/category'])
          }else{
            this.notificationService.showErrorNotification('', result.errorMessage)
          }
        })
       
  
      }
    }else{
      validateAllFormFields(this.categorForm)

    }
  
  }

}
