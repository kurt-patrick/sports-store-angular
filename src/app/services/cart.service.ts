import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: CartItem[] = [];

  constructor() {
  }

  addProduct(product: Product, quantity: number): void {
    let index = this.indexOf(product);
    if (index === -1) {
      const cartLine = new CartItem(product, quantity);
      index = this.cartItems.push(cartLine);
    } else {
      const cartItem: CartItem = this.cartItems[index];
      cartItem.quantity += +quantity;
    }
    index = this.indexOf(product);
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  removeItem(cartItem: CartItem): void {
    const index: number = this.indexOf(cartItem.product);
    if (index >= 0) {
      this.cartItems.splice(index, 1);
    }
  }

  private indexOf(product: Product): number {
    if (!this.cartItems || this.cartItems.length === 0) {
      return -1;
    }

    let index = 0;
    for (const cartItem of this.cartItems) {
      if (product.id === cartItem.product.id) {
        return index;
      }
      index += 1;
    }

    return -1;
  }

}
