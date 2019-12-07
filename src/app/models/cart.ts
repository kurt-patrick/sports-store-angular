import { CartItem } from './cart-item';

export class Cart {
  guid: string;
  id: number;
  exTotal: number;
  incTotal: number;
  gst: number;
  items: CartItem[] = [];

  constructor() {
  }

}
