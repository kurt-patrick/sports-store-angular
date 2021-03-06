import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(err => {

          console.log('ErrorInterceptor.intercept');
          console.log('err.status: ' + err.status);

          // auto logout if 401 response returned from api
          if (err.status === 401) {
            this.authService.redirectUrl = '/signin';
            this.authService.logout();
          }

          const error = err.error.message || err.statusText;
          return throwError(error);
      }));
  }
}
