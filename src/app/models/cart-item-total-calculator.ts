import {
  CartItem
} from './cart-item';

export class CartItemTotalCalculator {

  static calculateCartQuantity(cartItems: CartItem[]): number {
    if (!cartItems) {
      return 0;
    }
    // tslint:disable-next-line: no-inferrable-types
    let total: number = 0;
    for (const item of cartItems) {
      total += +item.quantity;
    }
    return +total;
  }

}
