import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';

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

}
