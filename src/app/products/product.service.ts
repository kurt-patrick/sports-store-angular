import {
  BehaviorSubject
} from 'rxjs';
import {
  map
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

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products$: BehaviorSubject < Product[] > = new BehaviorSubject < Product[] > (MOCK_PRODUCTS);

  constructor() {}

  getProducts() {
    return this.products$;
  }

  getProductById(id: number) {
    return this.getProducts().pipe(
      map(list => list.find(product => product.id === +id))
    );
  }

  searchProducts(productName: string) {
    const matchOn = productName.toLowerCase();
    return this.getProducts().pipe(
      map(list => list.find(product => product.productName.indexOf(productName) >= 0))
    );
  }

}
