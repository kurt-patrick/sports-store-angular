import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UserAccount } from '../models/user-account';
import { Product } from '../models/product';
import { MOCK_PRODUCTS } from '../models/mock-products';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(MOCK_PRODUCTS);

  constructor() {}

  getUserAccounts(): UserAccount[] {
    return [
      {
        id: 1,
        username: 'test@email.com',
        password: 'password',
        loggedIn: false
      }
    ];
  }

  getUserAccount(email: string, pPassword: string): UserAccount {
    const userAccounts = this.getUserAccounts();
    return userAccounts.find( ({username, password}) =>
      username === email && password === pPassword);
  }

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
