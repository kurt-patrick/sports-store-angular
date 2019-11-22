import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/products/product.service';
import { ActivatedRoute } from '@angular/router';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  products$: Observable <Product[]>;
  public searchValue: string;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private messagingService: MessagingService
  ) {}

  ngOnInit() {
    this.messagingService.searchByName$.subscribe(value => {
      this.searchValue = value;
      this.performSearch(value);
    });
  }

  ngOnDestroy() {
  }

  private performSearch(value: string): void {
    if (!value || value.trim().length === 0) {
      return;
    }
    this.products$ = this.productService.searchProducts(value);
  }

}
