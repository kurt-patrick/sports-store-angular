import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxLoadingModule } from 'ngx-loading';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignInComponent } from './sign-in/sign-in.component';

import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { HttpClientModule } from '@angular/common/http';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductDetailResolverService } from './products/product-detail-resolver.service';
import { ProductService } from './products/product.service';
import { ProductSnapshotComponent } from './products/product-snapshot/product-snapshot.component';
import { ProductSizesComponent } from './products/product-sizes/product-sizes.component';
import { CartLineComponent } from './cart-line/cart-line.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SignInComponent,
    SearchResultsComponent,
    SearchResultComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductSnapshotComponent,
    ProductSizesComponent,
    CartLineComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ShowHidePasswordModule,
    FormsModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [
    ProductService,
    ProductDetailResolverService
  ],
  bootstrap: [AppComponent],
  entryComponents: [SignInComponent]
})
export class AppModule { }
