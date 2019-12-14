import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  submit(guid: string): Observable<any> {
    console.log(`OrderService.submit(${guid})`);
    console.log(`${environment.apiUrl}/orders/${guid}/submit`);
    console.log('about to post');
    return this.http.get<any>(`${environment.apiUrl}/orders/${guid}/submit`)
      .pipe(
        tap(res => console.log('http response: ' + JSON.stringify(res))),
        map(model => {
          console.log('in post');
          console.log('response body:');
          console.log(JSON.stringify(model));
          localStorage.setItem('order-response', JSON.stringify(model));
          return model;
        })
      );
  }

  orderResponse(): any {
    const orderResponse = localStorage.getItem('order-response');
    if (!orderResponse || orderResponse.trim().length === 0) {
      return of ({ id: 0, incTotal: 0 });
    }
    return JSON.parse(orderResponse);
  }

}
