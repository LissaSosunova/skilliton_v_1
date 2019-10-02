import { TestBed } from '@angular/core/testing';

import { AvatarService } from './avatar.service';

describe('AvatarServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AvatarService = TestBed.get(AvatarService);
    expect(service).toBeTruthy();
  });
});
