import { TestBed } from '@angular/core/testing';

import { ToolRentalService } from './tool-rental.service';

describe('ToolRentalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToolRentalService = TestBed.get(ToolRentalService);
    expect(service).toBeTruthy();
  });
});
