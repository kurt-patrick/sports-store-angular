import {
  BehaviorSubject, Observable
} from 'rxjs';
import {
  map, throttleTime
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
      .pipe(map(model => {
        return model;
      }));
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`)
      .pipe(map(model => {
        return model;
      }));
  }

  searchProducts(productName: string) {
    const matchOn = productName.toLowerCase();
    return this.getProducts().pipe(
      map(list => list.find(product => product.productName.indexOf(productName) >= 0))
    );
  }

}
