import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,Validators, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service/http-service.service';
import {environment} from 'src/environments/environment';
import {ActivatedRoute, Router} from '@angular/router'
import { HttpParams } from '@angular/common/http';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NotificationService } from '../services/notification-service/notification.service';

@Component({
  selector: 'app-search-invoice',
  templateUrl: './search-invoice.component.html',
  styleUrls: ['./search-invoice.component.css']
})
export class SearchInvoiceComponent implements OnInit {
  searcgInvoiceForm:FormGroup;
  showData:Boolean = false;
  static readonly getInvoice = `invoice/{id}`;
  searchList;
  productList;
  page = {
    pageSize: 10,
    limit: 10,
    count: 0,
    pageNumber: 0,
    orderBy: 'id',
    orderDir: 'desc'
  };
  count;
  pageSize = 10;
  temp = [];
  sizeList = [5, 10, 15, 20, 30, 50];
  currentPageLimit = 10;

@ViewChild(DatatableComponent) ngxDatatable: DatatableComponent;

constructor(private fb:FormBuilder,    private notificationService:NotificationService
,  private httpService: HttpService, private router:Router, private activateRoute: ActivatedRoute) {
  this.searcgInvoiceForm = this.fb.group({
    searchInvoice:['']
  })


}
  ngOnInit(): void {
  }
  search(id){
  this.httpService.doGet(SearchInvoiceComponent.getInvoice.replace(/{id}/g, id)).subscribe((result) => {
    if(result?.errorMessage){
      this.showData = false;

      this.notificationService.showErrorNotification('', result.errorMessage)

    }else{
      this.searchList = result;
      this.productList = result?.products
      this.count = this.productList.length;
      this.showData = true;
      console.log(result)
    }
   
    

  })
}
onPageSizeChange(limit, id): void {
  this.currentPageLimit = parseInt(limit, 10);
  this.ngxDatatable.limit = this.currentPageLimit;
  this.ngxDatatable.recalculate();
  this.ngxDatatable.offset = 0;
  this.search(id);
}
setPage(pageInfo): void {
  this.ngxDatatable.limit = this.currentPageLimit;
  this.ngxDatatable.recalculate();
}

}
