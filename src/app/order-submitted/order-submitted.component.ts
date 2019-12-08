import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-order-submitted',
  templateUrl: './order-submitted.component.html',
  styleUrls: ['./order-submitted.component.scss']
})
export class OrderSubmittedComponent implements OnInit {

  orderTotalIncTax: number;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.orderTotalIncTax = this.cartService.getCart().incTotal;
  }

}
