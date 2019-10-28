import { TestBed } from '@angular/core/testing';

import { ToolPhotoService } from './tool-photo.service';

describe('ToolPhotoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToolPhotoService = TestBed.get(ToolPhotoService);
    expect(service).toBeTruthy();
  });
});
