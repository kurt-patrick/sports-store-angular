import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-submitted',
  templateUrl: './order-submitted.component.html',
  styleUrls: ['./order-submitted.component.scss']
})
export class OrderSubmittedComponent implements OnInit {

  orderId: number;
  orderTotalIncTax: number;
  private orderService: OrderService;
  private cartService: CartService;

  constructor(orderService: OrderService, cartService: CartService) {
    this.orderService = orderService;
    this.cartService = cartService;
    this.cartService.clearCart();
  }

  ngOnInit() {
    const order = this.orderService.orderResponse();
    this.orderId = order.id;
    this.orderTotalIncTax = order.incTotal;
  }

}
