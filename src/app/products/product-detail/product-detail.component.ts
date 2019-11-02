import {
  Component,
  OnInit,
  Input,
  Inject
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  Data
} from '@angular/router';
import {
  Observable
} from 'rxjs';

import {
  Product, Gender
} from '../../models/product';
import { MessagingService } from '../../services/messaging.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  @Input() product: Product;

  genderText(): string {
    if (!this.product) {
      return '';
    }
    return this.product.gender === Gender.womens ? 'Women\'s'  : 'Men\'s';
  }

  constructor(private activatedRoute: ActivatedRoute, private messagingService: MessagingService) {

    /*
    activatedRoute.data.subscribe({
      complete: () => this.messagingService.showNgxLoading(false),
      error: () => this.messagingService.showNgxLoading(false),
      // tslint:disable-next-line: no-string-literal
      next: data => this.product = data['product'],
    });
    */

    activatedRoute.data.subscribe({
      complete: this.onComplete,
      error: this.onError,
      next: data => this.onNext(data),
    });

  }

  onComplete(): void {
    this.messagingService.showNgxLoading(false);
  }

  onError(): void {
    this.messagingService.showNgxLoading(false);
  }

  onNext(data: Data): void {
    // tslint:disable-next-line: no-string-literal
    this.product = data['product'];
    this.messagingService.showNgxLoading(false);
  }

  ngOnInit() {
    // this.messagingService.showNgxLoading(false);
  }

}
