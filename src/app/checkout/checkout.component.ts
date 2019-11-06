import {
  Component,
  OnInit
} from '@angular/core';
import {
  CartService
} from '../services/cart.service';
import {
  CartItemTotalCalculator
} from '../models/cart-item-total-calculator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {}

  /**
   * This is ex total for all items excluding postage
   */
  itemsExTotal(): number {
    console.log('CheckoutComponent.itemsExTotal()');
    const total: number = CartItemTotalCalculator.calculateCartTotal(this.cartService.getCartItems());
    if (!total || total === 0) {
      return 0;
    }
    return +(total / 1.1);
  }

  shippingAndHandling(): number {
    return 0;
  }

  /**
   * This is itemsExTotal() + ShippingAndHndling()
   */
  totalBeforeTax(): number {
    return +(this.itemsExTotal() + this.shippingAndHandling());
  }

  /**
   * tax rate * totalBeforeTax()
   */
  estimatedTaxToBeCollected(): number {
    return +(0.1 * this.totalBeforeTax());
  }

  /**
   * totalBeforeTax() + estimatedTaxToBeCollected()
   */
  orderTotalIncTax(): number {
    return +(this.totalBeforeTax() + this.estimatedTaxToBeCollected());
  }

  submitOrder(): boolean {
    this.router.navigate(['/order-submitted']);
    return false;
  }

}
