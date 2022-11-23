import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http-service/http-service.service';
import { Router } from '@angular/router'
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  brandList;
  showSarch:Boolean=false;
  searchform:FormGroup;
  showAddBrand: Boolean = false;
  static readonly searchBrand = `brandSearch/{id}`;

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

  constructor(private httpService: HttpService, private router: Router, private fb:FormBuilder) {
 this.searchform = this.fb.group({
  search:['']
 })
  }

  ngOnInit(): void {
    this.getBrandList();



  }


  getBrandList() {
    this.httpService.doGet('brand').subscribe((result) => {
      this.brandList = result?.brands;
      this.count = this.brandList.length;

      console.log(result)
    })
  }
  onPageSizeChange(limit): void {
    this.currentPageLimit = parseInt(limit, 10);
    this.ngxDatatable.limit = this.currentPageLimit;
    this.ngxDatatable.recalculate();
    this.ngxDatatable.offset = 0;
    this.getBrandList();
  }
  setPage(pageInfo): void {
    this.ngxDatatable.limit = this.currentPageLimit;
    this.ngxDatatable.recalculate();
  }
  updateFilter(data){
    this.showSarch =true;
    console.log(data)
    this.httpService.doGet(BrandComponent.searchBrand.replace(/{id}/g, data)).subscribe((result) => {
      this.brandList =result?.brands
    console.log(result)
    })

  }
  reset(){
    this.showSarch =false;
    this.getBrandList();

  }
  
  updateBrand(row) {
    this.router.navigate(['/addBrand'], { queryParams: { id: row.id, name: row.name, status: row.status } });
  }



}
