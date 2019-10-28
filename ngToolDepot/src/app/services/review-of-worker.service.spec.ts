import { TestBed } from '@angular/core/testing';

import { ReviewOfWorkerService } from './review-of-worker.service';

describe('ReviewOfWorkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReviewOfWorkerService = TestBed.get(ReviewOfWorkerService);
    expect(service).toBeTruthy();
  });
});
