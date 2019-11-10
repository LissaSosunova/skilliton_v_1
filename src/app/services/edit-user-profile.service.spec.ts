import { TestBed } from '@angular/core/testing';

import { EditUserProfileService } from './edit-user-profile.service';

describe('EditUserProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditUserProfileService = TestBed.get(EditUserProfileService);
    expect(service).toBeTruthy();
  });
});
