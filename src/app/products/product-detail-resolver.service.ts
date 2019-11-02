import {
  Injectable
} from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {
  Observable,
  of ,
  EMPTY
} from 'rxjs';
import {
  mergeMap,
  take
} from 'rxjs/operators';

import { ProductService } from './product.service';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailResolverService implements Resolve<Product> {

  constructor(private productService: ProductService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> | Observable<never> {

    const id = route.paramMap.get('id');

    return this.productService.getProductById(+id).pipe(
      take(1),
      mergeMap(product => {
        if (product) {
          return of(product);
        } else { // id not found
          this.router.navigate(['/home']);
          return EMPTY;
        }
      })
    );
  }
}
