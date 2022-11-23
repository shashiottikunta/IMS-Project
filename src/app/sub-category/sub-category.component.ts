import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http-service/http-service.service';
import {Router, ActivatedRoute} from '@angular/router'
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  subCategoryList;
  searchform:FormGroup;

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
  showSarch:Boolean=false;
  static readonly subCategorySearch = `subcategorySearch/{id}`;

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
    this.getSubCategory();
  }
  setPage(pageInfo): void {
    this.ngxDatatable.limit = this.currentPageLimit;
    this.ngxDatatable.recalculate();
  }
  updateFilter(data){
    this.showSarch =true;
    console.log(data)
    this.httpService.doGet(SubCategoryComponent.subCategorySearch.replace(/{id}/g, data)).subscribe((result) => {
      this.subCategoryList =result?.sub_categories
    console.log(result)
    })

  }
  reset(){
    this.showSarch =false;
    this.getSubCategory();

  }

  ngOnInit(): void {
    this.getSubCategory();
    
  }
  getSubCategory(){
    this.httpService.doGet('subCategory').subscribe((result) => {
      this.subCategoryList =result?.sub_categories;
      this.count = this.subCategoryList.length;

    })
  }
  updateSubCategory(row){
    console.log(row.category.id)
    this.router.navigate(['/addSubCategory'], { queryParams: { id: row.id, name: row.name, status: row.status, categoryId: row.category.id } });
  }

}
