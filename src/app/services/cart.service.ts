import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { CartItem } from '../models/cart-item';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {
  }

  getCartGuid(): Observable<string> {

    console.log('getCartGuid()');

    const cartGuid = localStorage.getItem('cart-guid');
    if (cartGuid && cartGuid.trim().length === 36) {
      console.log('return of(cartGuid);');
      return of(cartGuid);
    }

    console.log('calling /cart/create');
    return this.http.get<Cart>(`${environment.apiUrl}/cart/create`)
      .pipe(
        tap(res => console.log('http response: ' + JSON.stringify(res))),
        map(model => {
          localStorage.setItem('cart-guid', model.guid);
          this.saveCartToLocalStorage(model);
          return model.guid;
        })
      );

  }

  addProduct(product: Product, quantity: number): void {
    console.log('addProduct()');

    this.getCartGuid().subscribe(
      (guid: string) => {
        console.log('guid: ' + guid);

        const cart = this.getCartFromLocalStorage();
        const index = this.indexOf(product, cart);

        if (index >= 0) {
          quantity += +cart.items[index].quantity;
        }

        this.http.post<Cart>(`${environment.apiUrl}/cart/${guid}/add`, { ProductId: product.id, Quantity: quantity })
        .pipe(
          map(model => {
            this.saveCartToLocalStorage(model);
            return model;
          })
        )
        .subscribe(
          (value: Cart): void => {
            // console.log('value: ' + JSON.stringify(value));
          },
          (error: any): void => {
            // console.log('error: ' + JSON.stringify(error));
          },
          (): void => {
            // console.log('()');
          }
        );


      });

  }

  private getCartFromLocalStorage(): Cart {
    return JSON.parse(localStorage.getItem('cart-contents'));
  }

  private saveCartToLocalStorage(cart: Cart): void {
    console.log('saveCartToLocalStorage');
    console.log(JSON.stringify(cart));
    localStorage.setItem('cart-contents', JSON.stringify(cart));
  }

  getCart(): Cart {
    return this.getCartFromLocalStorage();
  }

  removeItem(cartItem: CartItem): void {
    this.getCartGuid().subscribe(
      (guid: string) => {
        this.http.post<Cart>(`${environment.apiUrl}/cart/${guid}/remove`, { ProductId: cartItem.productId })
        .pipe(map(model => {
          this.saveCartToLocalStorage(model);
        }));
    });
  }

  private indexOf(product: Product, cart: Cart): number {
    if (!cart || !cart.items || cart.items.length === 0) {
      console.log('indexOf. cart is null or no items...');
      return -1;
    }

    let index = 0;
    for (const item of cart.items) {
      if (product.id === item.productId) {
        return index;
      }
      index += 1;
    }

    return -1;
  }

}
