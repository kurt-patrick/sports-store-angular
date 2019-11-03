import { Component, OnInit, Input } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { CartService } from '../services/cart.service';
import { CartItemTotalCalculator } from '../models/cart-item-total-calculator';

@Component({
  selector: 'app-cart-line',
  templateUrl: './cart-line.component.html',
  styleUrls: ['./cart-line.component.scss']
})
export class CartLineComponent implements OnInit {

  @Input() cartItem: CartItem;

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  quantityValues(): number[] {
    let max = 5;
    if (this.cartItem && this.cartItem.quantity > 0) {
      max = Math.max(max, this.cartItem.quantity);
    }
    const arr: number[] = [];
    // tslint:disable-next-line: no-inferrable-types
    let value: number = 1;
    while (value <= max) {
      arr.push(value);
      value += 1;
    }
    return arr;
  }

  lineTotal(): number {
    return CartItemTotalCalculator.calculateLineTotal(this.cartItem);
  }

  delete(): void {
    this.cartService.removeItem(this.cartItem);
  }

}
