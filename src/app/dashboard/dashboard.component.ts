import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service/http-service.service';
import {environment} from 'src/environments/environment';
import {ActivatedRoute, Router} from '@angular/router'
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashbordList;
  constructor(private fb:FormBuilder, private httpService: HttpService, private router:Router, private activateRoute: ActivatedRoute) {
  
  }
  ngOnInit(): void {
    this.getDashboardList();
  }



  getDashboardList() {
    this.httpService.doGet('dashboard').subscribe((result) => {
    this.dashbordList = result;
    console.log(result)


    })
  }

}
