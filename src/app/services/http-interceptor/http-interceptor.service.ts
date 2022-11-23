import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {
  accessToken: string;
    clientToken: string;
    constructor(public router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): import('rxjs').Observable<HttpEvent<any>> {
      this.clientToken = localStorage.getItem("client-token");
      this.accessToken = localStorage.getItem("access-token");
      if (this.clientToken) {
          req = req.clone({
              headers: req.headers.set('Access-Control-Allow-Origin', '*').set('Authorization', 'Bearer ' +
                  this.clientToken),
              responseType: 'json',
          });
      }
      if (this.accessToken) {
          req = req.clone({
              headers: req.headers.set('Access-Control-Allow-Origin', '*').set('Authorization', 'Bearer ' +
                  this.accessToken),
              responseType: 'json',
          });
      }
      return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
      }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                  this.router.navigate(['login']);
              } else if (err.status === 0) {
              }
          }
      }));
  }
}
