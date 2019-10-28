import { TestBed } from '@angular/core/testing';

import { SkillRentalService } from './skill-rental.service';

describe('SkillRentalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SkillRentalService = TestBed.get(SkillRentalService);
    expect(service).toBeTruthy();
  });
});
