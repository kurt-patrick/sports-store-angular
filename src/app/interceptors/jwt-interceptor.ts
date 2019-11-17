import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add authorization header with jwt token if available

      console.log('JwtInterceptor.intercept');

      const currentUser = this.authService.currentUserValue;
      if (currentUser && currentUser.token) {
          request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${currentUser.token}`
              }
          });
      }

      return next.handle(request);
  }
}
