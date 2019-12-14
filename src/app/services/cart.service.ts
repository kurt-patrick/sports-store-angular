import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { CartItem } from '../models/cart-item';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private changeEvent = new BehaviorSubject<Cart>(null);
  onChange = this.changeEvent.asObservable();

  constructor(private http: HttpClient) {
  }

  cartChanged(value: Cart = null) {
    let cart: Cart = value;
    if (!cart) {
      cart = this.getCartFromLocalStorage();
    }
    this.changeEvent.next(cart);
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

  updateProductQuantity(productId: number, quantity: number): void {
    console.log(`updateProductQuantity(${productId}, ${quantity})`);

    this.getCartGuid().subscribe(
      (guid: string) => {
        console.log('guid: ' + guid);

        this.http.post<Cart>(`${environment.apiUrl}/cart/${guid}/add`, { ProductId: +productId, Quantity: quantity })
        .pipe(
          map(model => {
            this.saveCartToLocalStorage(model);
            return model;
          })
        )
        .subscribe(
          (value: Cart): void => {
            // console.log('value: ' + JSON.stringify(value));
            this.cartChanged(value);
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

  addProduct(product: Product, quantity: number): void {
    console.log('addProduct()');
    this.updateProductQuantity(product.id, quantity);
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
    console.count('CartService.removeItem()');
    this.getCartGuid().subscribe(
      (guid: string) => {
        console.log(`guid: ${guid}`);
        console.log(`ProductId: ${cartItem.productId}`);

        this.http.post<Cart>(`${environment.apiUrl}/cart/${guid}/remove`, { ProductId: cartItem.productId })
        .pipe(
          map(model => {
            console.log(JSON.stringify(model));
            this.saveCartToLocalStorage(model);
            return model;
          })
        )
        .subscribe(
          (value: Cart): void => {
            console.log('value: ' + JSON.stringify(value));
            this.changeEvent.next(value);
          },
          (error: any): void => {
            console.log('error: ' + JSON.stringify(error));
          },
          (): void => {
            console.log('()');
          }
        );

    });
  }

  clearCart(): void {
    localStorage.removeItem('cart-contents');
    this.changeEvent.next(this.getCartFromLocalStorage());
  }

}
