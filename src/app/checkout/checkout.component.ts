import {
  Component,
  OnInit
} from '@angular/core';
import {
  CartService
} from '../services/cart.service';
import {
  Router
} from '@angular/router';
import {
  AuthService
} from '../services/auth.service';
import {
  HttpClient
} from '@angular/common/http';
import {
  OrderService
} from '../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient) {}

  ngOnInit() {}

  quantityTotal(): number {
    console.log('CheckoutComponent.quantityTotal()');
    return this.cartService.getCart().quantityTotal;
  }

  itemsExTotal(): number {
    console.log('CheckoutComponent.itemsExTotal()');
    return this.cartService.getCart().exTotal;
  }

  totalBeforeTax(): number {
    return +this.itemsExTotal();
  }

  estimatedTaxToBeCollected(): number {
    return this.cartService.getCart().gst;
  }

  orderTotalIncTax(): number {
    return this.cartService.getCart().incTotal;
  }

  submitOrder(): boolean {
    console.log('checkout.submitOrder()');
    this.cartService.getCartGuid()
      .subscribe((guid: string) => {
        this.orderService.submit(guid)
          .subscribe(
            (value: any): void => {
              console.log('success: ');
              console.log(JSON.stringify(value));
              this.router.navigate(['/order-submitted']);
            },
            (error: any) => {
              console.log('error: ');
              console.log(JSON.stringify(error));
              // this.authService.redirectUrl = '/checkout';
              alert(error);
            },
            () => {
              console.log('complete');
            }
          );
      });


    console.log('return false');
    return false;

  }

}
