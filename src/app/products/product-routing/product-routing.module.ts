import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {
  ProductListComponent
} from '../product-list/product-list.component';
import {
  ProductDetailComponent
} from '../product-detail/product-detail.component';

import {
  ProductDetailResolverService
} from '../product-detail-resolver.service';

const productRoutes: Routes = [
  {
    path: ':id',
    component: ProductDetailComponent,
    resolve: {
      product: ProductDetailResolverService
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(productRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductRoutingModule {}
