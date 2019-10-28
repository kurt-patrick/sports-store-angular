import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';

import {
  ProductService
} from '../product.service';
import {
  Product, Gender
} from '../../models/product';
import {
  Observable
} from 'rxjs';
import {
  switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable < Product[] > ;
  selectedId: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.products$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = +params.get('id');
        return this.productService.getProducts();
      })
    );
  }

  genderText(product: Product): string {
    if (!product) {
      return '';
    }
    return product.gender === Gender.womens ? 'Women\'s'  : 'Men\'s';
  }

}
