import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http-service/http-service.service';
import { Router } from '@angular/router'
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NotificationService } from '../services/notification-service/notification.service';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  static readonly getProduct = `searchProduct/{id}`;
  searchForm:FormGroup;
  searchList;
  showDetails:Boolean= false;

  constructor(private httpService: HttpService, private router: Router, private fb:FormBuilder,private notificationService:NotificationService) {
    this.searchForm=this.fb.group({
      search:['']
    })
  }

  ngOnInit(): void {
  }
  updateFilter(data){
    console.log(data)
    this.httpService.doGet(InventoryComponent.getProduct.replace(/{id}/g, data)).subscribe((result) => {
      if(result.errorMessage){
        this.notificationService.showErrorNotification('', result.errorMessage)
        this.showDetails = false

      }else{
        this.searchList =result?.product;
        this.showDetails =true

      }
    })
  }



}
