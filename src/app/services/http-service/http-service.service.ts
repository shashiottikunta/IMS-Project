import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
//import { NGXLogger } from 'ngx-logger';
import { catchError, filter, map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {  of as observableOf } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly apiRoot: string = "http://localhost:4001";
	constructor(private readonly http: HttpClient) {}

  doPost(endpoint, payload) {
		const url = `${this.apiRoot}/${endpoint}`;
		return this.http.post(url, payload).pipe(map((response: any) => response));
	}
	doGet(endpoint) {
		const url = `${this.apiRoot}/${endpoint}`;
		return this.http.get(url).pipe(map((response: any) => response));
	}
	doGetWith(endpoint) { 
		const url = `${this.apiRoot}${endpoint}`;
		return this.http.get(url).pipe(map((response: Response) => response));
	}
	doPut(endpoint, payload) { 
		const url = `${this.apiRoot}${endpoint}`;
		return this.http.put(url,payload).pipe(map((response: any) => response));
	}
	


	
}
