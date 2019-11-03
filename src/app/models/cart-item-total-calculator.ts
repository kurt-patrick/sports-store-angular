import { CartItem } from './cart-item';

export class CartItemTotalCalculator {

  static calculateLineTotal(cartItem: CartItem): number {
    if (!cartItem || !cartItem.product || cartItem.quantity <= 0) {
      return 0;
    }
    return +(cartItem.quantity * cartItem.product.productPrice);
  }

}
