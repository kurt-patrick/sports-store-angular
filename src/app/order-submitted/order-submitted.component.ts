import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItemTotalCalculator } from '../models/cart-item-total-calculator';

@Component({
  selector: 'app-order-submitted',
  templateUrl: './order-submitted.component.html',
  styleUrls: ['./order-submitted.component.scss']
})
export class OrderSubmittedComponent implements OnInit {

  constructor(private cartService: CartService) {}

  ngOnInit() {
  }

  orderTotalIncTax(): number {
    return this.cartService.getCart().incTotal;
  }

}
