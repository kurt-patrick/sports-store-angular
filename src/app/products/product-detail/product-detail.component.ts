import {
  Component,
  OnInit,
  Input,
  Inject
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  Observable
} from 'rxjs';

import {
  Product, Gender
} from '../../models/product';
import { stringify } from '@angular/compiler/src/util';

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

  constructor(private activatedRoute: ActivatedRoute) {
    console.log('ProductDetailComponent.constructor()');

    activatedRoute.data.subscribe(
      // tslint:disable-next-line: no-string-literal
      data => this.product = data['product']
    );

    // console.log('product: ' + (JSON.stringify(cake)));
    // console.log('cake.id: ' + (cake.id));
  }

  ngOnInit() {
    console.log('ProductDetailComponent.ngOnInit()');
    console.log('this.product: ' + (this.product));
  }

}
