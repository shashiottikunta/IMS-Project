import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service/http-service.service';
import {environment} from 'src/environments/environment';
import {Router} from '@angular/router'
import { NotificationService } from '../services/notification-service/notification.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm:FormGroup

  constructor(private fb:FormBuilder,private notificationService:NotificationService, private httpService: HttpService, private router:Router) {
    this.changePasswordForm = this.fb.group({
      currentPassword:[''],
      newPassword:['']

    })
   }
  ngOnInit(): void {
  }
  submit(){
    let payload={
      current_password:this.changePasswordForm.get('currentPassword').value,
      new_password:this.changePasswordForm.get('newPassword').value
    }
    this.httpService.doPost('changePassword', payload).subscribe((result)=>{
      if(result?.errorMessage){
        this.notificationService.showErrorNotification('', result.errorMessage)
      }else{
        this.notificationService.showSucessNotification('', result.message)
        this.changePasswordForm.reset();

      }
    })

  }

}
