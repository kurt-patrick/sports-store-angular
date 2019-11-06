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

  get items(): CartItem[] {
    return this.cartService.getCartItems();
  }

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  remove(cartItem: CartItem): void {
    this.cartService.removeItem(cartItem);
  }

  subtotal(): number {
    return CartItemTotalCalculator.calculateCartTotal(this.cartService.getCartItems());
  }

  totalQuantity(): number {
    return CartItemTotalCalculator.calculateCartQuantity(this.cartService.getCartItems());
  }

}
