import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http-service/http-service.service';
import {Router} from '@angular/router'
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productList;
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
  static readonly productSearch = `productSearch/{id}`;

  constructor(private httpService: HttpService, private router: Router, private fb:FormBuilder) {
    this.searchform = this.fb.group({
      search:['']
     })
   }

  ngOnInit(): void {
    this.getProduct();
    
  }
  onPageSizeChange(limit): void {
    this.currentPageLimit = parseInt(limit, 10);
    this.ngxDatatable.limit = this.currentPageLimit;
    this.ngxDatatable.recalculate();
    this.ngxDatatable.offset = 0;
    this.getProduct();
  }
  setPage(pageInfo): void {
    this.ngxDatatable.limit = this.currentPageLimit;
    this.ngxDatatable.recalculate();
  }
  updateProduct(row){
    console.log(row)
    this.router.navigate(['/addProduct'], { queryParams: { id: row.id, productName: row.name, categoryName: row.category.id, subCategory:row.sub_category.id,
     brand:row.brand.id, units:row.units, price:row.price, modalNumber:row.model_number, status:row.status} });


  }
  updateFilter(data){
    this.showSarch =true;
    console.log(data)
    this.httpService.doGet(ProductComponent.productSearch.replace(/{id}/g, data)).subscribe((result) => {
      this.productList =result?.prodcuts
      this.count = this.productList.length;

    console.log(result)
    })

  }
  reset(){
    this.showSarch =false;
    this.getProduct();

  }
  getProduct(){
    this.httpService.doGet('product').subscribe((result) => {
      this.productList =result?.prodcuts;
      this.count = this.productList.length;

      console.log(result)
    })
  }

}
