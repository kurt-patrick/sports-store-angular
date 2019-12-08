import { CartItem } from './cart-item';

export class Cart {
  guid: string;
  exTotal: number;
  incTotal: number;
  gst: number;
  quantityTotal: number;
  items: CartItem[] = [];

  constructor() {
  }

}
