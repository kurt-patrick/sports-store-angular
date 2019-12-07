import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { CartItemTotalCalculator } from '../models/cart-item-total-calculator';

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
  }

  ngOnInit() {
    console.count('CartComponent.ngOnInit()');
    const cart = this.cartService.getCart();
    if (cart && cart.items) {
      this.items = cart.items;
      this.subtotal = cart.exTotal;
      this.totalQuantity = CartItemTotalCalculator.calculateCartQuantity(cart.items);
    }
  }

  remove(cartItem: CartItem): void {
    this.cartService.removeItem(cartItem);
  }

}
