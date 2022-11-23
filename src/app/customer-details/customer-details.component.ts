import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http-service/http-service.service';
import { Router } from '@angular/router'
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  customerList;
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

  constructor(private httpService: HttpService, private router: Router) {
  }

  ngOnInit(): void {
    this.getCustomerDetails();
  }
  onPageSizeChange(limit): void {
    this.currentPageLimit = parseInt(limit, 10);
    this.ngxDatatable.limit = this.currentPageLimit;
    this.ngxDatatable.recalculate();
    this.ngxDatatable.offset = 0;
    this.getCustomerDetails();
  }
  setPage(pageInfo): void {
    this.ngxDatatable.limit = this.currentPageLimit;
    this.ngxDatatable.recalculate();
  }
  getCustomerDetails(){
    this.httpService.doGet('customer').subscribe((result) => {
      this.customerList = result?.customers;
      this.count = this.customerList.length;

      console.log(result)
    })
  }



}
