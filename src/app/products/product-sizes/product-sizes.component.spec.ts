import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSizesComponent } from './product-sizes.component';

describe('ProductSizesComponent', () => {
  let component: ProductSizesComponent;
  let fixture: ComponentFixture<ProductSizesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSizesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
