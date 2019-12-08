import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  subtotal: number;
  totalQuantity: number;
  items: CartItem[] = [];

  constructor(private cartService: CartService) {
    console.count('CartComponent.constructor()');
    cartService.onChange.subscribe(value => {
      this.setValues(value);
    });
  }

  ngOnInit() {
    console.count('CartComponent.ngOnInit()');
    const cart = this.cartService.getCart();
    this.setValues(cart);
  }

  private setValues(cart: Cart): void {
    console.count('CartComponent.setValues()');
    if (cart && cart.items) {
      this.items = cart.items;
      this.subtotal = cart.incTotal;
      this.totalQuantity = cart.quantityTotal;
      console.log(JSON.stringify(cart));
    }
  }

  remove(cartItem: CartItem): void {
    console.count('CartComponent.remove()');
    this.cartService.removeItem(cartItem);
  }

}
