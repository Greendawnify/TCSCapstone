import { TestBed } from '@angular/core/testing';

import { Product.ServiceService } from './product.service.service';

describe('Product.ServiceService', () => {
  let service: Product.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Product.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
