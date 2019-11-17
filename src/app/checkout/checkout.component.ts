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
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { OrderSubmission } from '../models/order-submission';
import { OrderSubmissionProduct } from '../models/order-submission-product';
import { environment } from 'src/environments/environment';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private cartService: CartService, private router: Router, private authService: AuthService, private http: HttpClient) {}

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
    // {products: [{ id: 1, quantity: 1}], orderId: '' , userId: 1 }
    console.log('checkout.submitOrder()');
    const orderSubmission = this.buildOrderSubmission();

    console.log(`${environment.apiUrl}/orders/submit`);
    console.log('about to post');
    const response = this.http.post<OrderSubmission>(`${environment.apiUrl}/orders/submit`, orderSubmission)
      .pipe(
        tap(res => console.log('http response: ' + JSON.stringify(res))),
        map(model => {
          console.log('in post');
          console.log('response body:');
          console.log(JSON.stringify(model));
          return model;
        })
      ).subscribe(
        (value: OrderSubmission): void => {
          console.log('success: ');
          console.log(JSON.stringify(value));
          this.router.navigate(['/order-submitted']);
        },
        (error: any) => {
          console.log('error: ');
          console.log(JSON.stringify(error));
          this.authService.redirectUrl = '/checkout';
        },
        () => {
          console.log('complete');
        }
      );


    console.log('return false');
    return false;

  }

  private buildOrderSubmission(): OrderSubmission {
    console.log('checkout.buildOrderSubmission()');
    const order = new OrderSubmission();
    order.orderId = '';
    order.userId = this.authService.currentUserValue.id;
    const cartItems = this.cartService.getCartItems();
    cartItems.forEach(cartItem => order.products.push(new OrderSubmissionProduct(cartItem)));
    console.log(JSON.stringify(order));
    return order;
  }

}
