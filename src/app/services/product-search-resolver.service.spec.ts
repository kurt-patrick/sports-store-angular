import { TestBed } from '@angular/core/testing';

import { ProductSearchResolverService } from './product-search-resolver.service';

describe('ProductSearchResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductSearchResolverService = TestBed.get(ProductSearchResolverService);
    expect(service).toBeTruthy();
  });
});
