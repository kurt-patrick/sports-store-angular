import { Product } from './product';
import { throwError } from 'rxjs';
import { CartItem } from './cart-item';

export class OrderSubmissionProduct {

  constructor(cartItem: CartItem) {
    if (!cartItem) {
      throwError('product cannot be null');
    }
    this.id = cartItem.product.id;
    this.quantity = cartItem.quantity;
  }

  id: number;
  quantity: number;

}
