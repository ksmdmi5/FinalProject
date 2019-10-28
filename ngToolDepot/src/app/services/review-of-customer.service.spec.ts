import { TestBed } from '@angular/core/testing';

import { ReviewOfCustomerService } from './review-of-customer.service';

describe('ReviewOfCustomerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReviewOfCustomerService = TestBed.get(ReviewOfCustomerService);
    expect(service).toBeTruthy();
  });
});
