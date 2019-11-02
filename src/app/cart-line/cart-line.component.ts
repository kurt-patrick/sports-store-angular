import { Component, OnInit, Input } from '@angular/core';
import { CartItem } from '../models/cart-item';

@Component({
  selector: 'app-cart-line',
  templateUrl: './cart-line.component.html',
  styleUrls: ['./cart-line.component.scss']
})
export class CartLineComponent implements OnInit {

  @Input() cartItem: CartItem;

  constructor() { }

  ngOnInit() {
  }

  quantityValues(): number[] {
    let max = 5;
    if (this.cartItem && this.cartItem.quantity > 0) {
      max = Math.max(max, this.cartItem.quantity);
    }
    const arr: number[] = [];
    // tslint:disable-next-line: no-inferrable-types
    let value: number = 0;
    while (value <= max) {
      arr.push(value);
      value += 1;
    }
    return arr;
  }

}
