import { Product } from './product';

export class CartItem {
  id: number;
  product: Product;
  quantity: number;

  constructor(product: Product, quantity: number) {
    if (!product) {
      throw new Error('product is required');
    }
    if (product.id < 1) {
      throw new Error('product.id is required');
    }
    if (quantity < 1) {
      throw new Error('quantity is required');
    }

    this.product = product;
    this.quantity = quantity;
  }

}
