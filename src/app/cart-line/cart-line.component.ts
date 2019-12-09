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
  quantityValueCurrent: number;

  constructor(private cartService: CartService) {
    console.count('CartLineComponent.constructor()');
  }

  ngOnInit() {
    console.count('CartLineComponent.ngOnInit()');
    this.quantityValueCurrent = this.cartItem.quantity;
  }

  onQuantityChange(qty: number): void {
    console.count(`CartLineComponent.onQuantityChange(${qty})`);
    if (+qty !== +this.quantityValueCurrent) {
      console.log(`quantityValueCurrent: ${this.quantityValueCurrent}, qty: ${qty}`);
      this.cartItem.quantity = +qty;
      this.quantityValueCurrent = +qty;
      this.cartService.updateProductQuantity(this.cartItem.productId, +qty);
    }
  }

  delete(): void {
    console.count('CartLineComponent.delete()');
    this.cartService.removeItem(this.cartItem);
  }

}
