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

import { StoreService } from './store.service';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductSearchResolverService implements Resolve<Product> {

  constructor(private storeService: StoreService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> | Observable<never> {
    const productName = route.paramMap.get('product-name');

    return this.storeService.searchProducts(productName).pipe(
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
