import { TestBed } from '@angular/core/testing';

import { ReviewOfRenterService } from './review-of-renter.service';

describe('ReviewOfRenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReviewOfRenterService = TestBed.get(ReviewOfRenterService);
    expect(service).toBeTruthy();
  });
});
