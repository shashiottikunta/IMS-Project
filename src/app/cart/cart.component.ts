import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service/http-service.service';
import {environment} from 'src/environments/environment';
import {ActivatedRoute, Router} from '@angular/router'
import { HttpParams } from '@angular/common/http';
import { NotificationService } from '../services/notification-service/notification.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartForm:FormGroup;
  productDetails=[];
  total =0;
  productData=[];


  constructor(private fb:FormBuilder, private httpService: HttpService, private router:Router, private activateRoute: ActivatedRoute,
    private notificationService:NotificationService,) {
    this.cartForm = this.fb.group({
      customerName:['', Validators.required],
      customerMobilNumber:['', Validators.required],
      cash:['', Validators.required],
     


    })
  }
  ngOnInit(): void {
    //this.searchProduct();
    this.productDetails = JSON.parse(localStorage.getItem('names'));
    console.log(this.productDetails)
    this.productDetails.forEach(element =>{
      this.total = this.total + Number(element.price)
    })
    console.log(this.productDetails)
    
    let data =JSON.parse(localStorage.getItem('cart'));
    this.cartForm.patchValue({
      customerName:data?.customer_name,
      customerMobilNumber:data?.customer_phone,
    })


   
  }
  searchProduct(){
    this.httpService.doGet('searchProduct').subscribe((result) => {
      console.log(result)
    })
  }
  addCart(){
    let payload =
    {
      customer_name: this.cartForm.get('customerName').value,
      customer_phone:this.cartForm.get('customerMobilNumber').value,
      payment_mode: this.cartForm.get('cash').value,
    }
    localStorage.setItem("cart", JSON.stringify(payload));
    this.router.navigate(['/addCart'])
  }

  postCart(){
    let payload =
    {
      customer_name: this.cartForm.get('customerName').value,
      customer_phone:this.cartForm.get('customerMobilNumber').value,
      payment_mode: this.cartForm.get('cash').value,
      total_amount: this.total,
      products: 
        this.productDetails 
    }

    console.log(payload)
   
    this.httpService.doPost('invoice', payload).subscribe((result)=>{
      if (result.message) {
        this.notificationService.showSucessNotification('', result.message)
        this.cartForm.reset();
        localStorage.removeItem("names");
        localStorage.removeItem("cart");
        this.productDetails =[];


      }else{
        this.notificationService.showSucessNotification('', result.errorMessage)
      }
      console.log(result)
    })


  }

}
