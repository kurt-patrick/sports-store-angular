import {
  CartItem
} from './cart-item';

export class CartItemTotalCalculator {

  static calculateLineTotal(cartItem: CartItem): number {
    if (!cartItem || !cartItem.product || cartItem.quantity <= 0) {
      return 0;
    }
    return +(cartItem.quantity * cartItem.product.productPrice);
  }

  static calculateCartTotal(cartItems: CartItem[]): number {
    if (!cartItems) {
      return 0;
    }
    // tslint:disable-next-line: no-inferrable-types
    let total: number = 0;
    for (const item of cartItems) {
      total += CartItemTotalCalculator.calculateLineTotal(item);
    }
    return total;
  }

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
