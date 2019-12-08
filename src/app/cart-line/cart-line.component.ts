import { Component, OnInit, Input } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-line',
  templateUrl: './cart-line.component.html',
  styleUrls: ['./cart-line.component.scss']
})
export class CartLineComponent implements OnInit {

  @Input() cartItem: CartItem;
  quantityValues: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(private cartService: CartService) {
    console.count('CartLineComponent.constructor()');
  }

  ngOnInit() {
    console.count('CartLineComponent.ngOnInit()');
  }

  /*
  get quantityValues(): number[] {
    console.count('CartLineComponent.quantityValues()');
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
  */

  delete(): void {
    console.count('CartLineComponent.delete()');
    this.cartService.removeItem(this.cartItem);
  }

}
