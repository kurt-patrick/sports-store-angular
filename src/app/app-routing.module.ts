import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductDetailResolverService } from './products/product-detail-resolver.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthGuard } from './guards/auth.guard';
import { OrderSubmittedComponent } from './order-submitted/order-submitted.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
    resolve: {
      product: ProductDetailResolverService
    }
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard]
  },
  { path: 'order-submitted', component: OrderSubmittedComponent },
  { path: 'cart', component: CartComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
