import { Component, OnInit, Input } from '@angular/core';
import { Gender, Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-snapshot',
  templateUrl: './product-snapshot.component.html',
  styleUrls: ['./product-snapshot.component.scss']
})
export class ProductSnapshotComponent implements OnInit {

  @Input() product: Product;

  genderText(): string {
    if (!this.product) {
      return '';
    }
    return this.product.gender === Gender.womens ? 'Women\'s'  : 'Men\'s';
  }

  constructor() {}

  ngOnInit() {
  }

}
