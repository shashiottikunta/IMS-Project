import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service/http-service.service';
import {environment} from 'src/environments/environment';
import {Router} from '@angular/router'
import { NotificationService } from '../services/notification-service/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor( private fb:FormBuilder, private httpService: HttpService, private router:Router, private notificationService:NotificationService) {
    this.loginForm = this.fb.group({
      username: '',
      password :''
    })
   }
   submitLogin(){
    if(this.loginForm.valid){
      let payload={
        username : this.loginForm.get('username').value,
        password : this.loginForm.get('password').value
      }
      this.httpService.doPost('login',payload).subscribe((result) => {
        if(result?.errorMessage){
          this.notificationService.showSucessNotification('', result.errorMessage)

        }else{
          this.notificationService.showSucessNotification('', 'Logged in Successfully')
          this.router.navigate(['/dashboard'])
          localStorage.setItem('access-token', result.access_token);
        }

       

        

      })
      
    }
   }

  ngOnInit(): void {
    localStorage.setItem("names", JSON.stringify([]));

  }

}
