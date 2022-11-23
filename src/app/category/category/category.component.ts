import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http-service/http-service.service';
import {Router} from '@angular/router';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  searchform:FormGroup;
  categoryList;
  showSarch:Boolean=false;

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
  static readonly categorySearch = `categorySearch/{id}`;

  constructor(private httpService: HttpService, private router: Router, private fb:FormBuilder) {
    this.searchform = this.fb.group({
      search:['']
     })
    
   }
   onPageSizeChange(limit): void {
    this.currentPageLimit = parseInt(limit, 10);
    this.ngxDatatable.limit = this.currentPageLimit;
    this.ngxDatatable.recalculate();
    this.ngxDatatable.offset = 0;
    this.getCategory();
  }
  setPage(pageInfo): void {
    this.ngxDatatable.limit = this.currentPageLimit;
    this.ngxDatatable.recalculate();
  }

  ngOnInit(): void {
    this.getCategory();
   
  }
  updateFilter(data){
    this.showSarch =true;
    console.log(data)
    this.httpService.doGet(CategoryComponent.categorySearch.replace(/{id}/g, data)).subscribe((result) => {
      this.categoryList =result?.categories
    console.log(result)
    })

  }
  getCategory(){
    this.httpService.doGet('category').subscribe((result) => {
      this.categoryList =result?.categories;
      this.count = this.categoryList.length;

    })
  }
  reset(){
    this.showSarch =false;
    this.getCategory();

  }
  updateCategory(row){
    this.router.navigate(['/addCategory'], { queryParams: { id: row.id, name: row.name, status: row.status } });


  }

  

}
