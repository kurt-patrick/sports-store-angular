import {
  BehaviorSubject, Observable
} from 'rxjs';
import {
  map, throttleTime, tap
} from 'rxjs/operators';
import {
  Injectable
} from '@angular/core';
import {
  Product
} from '../models/product';
import {
  MOCK_PRODUCTS
} from '../models/mock-products';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`)
      .pipe(
        map(model => {
          return model;
        })
      );
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`)
      .pipe(map(model => {
        return model;
      }));
  }

  searchProducts(productName: string) {
    console.log(`product.service.searchProducts()`);
    console.log(`${environment.apiUrl}/products/search?name=${productName}`);
    console.log('about to get');
    return this.http.get<Product[]>(`${environment.apiUrl}/products/search?name=${productName}`)
      .pipe(
        tap(res => console.log('http response: ' + JSON.stringify(res))),
        map(model => {
          console.log('in get');
          console.log('response body:');
          console.log(JSON.stringify(model));
          return model;
        })
      );
  }

}
