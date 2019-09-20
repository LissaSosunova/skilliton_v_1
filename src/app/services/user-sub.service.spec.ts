import { TestBed } from '@angular/core/testing';

import { UserSubService } from './user-sub.service';

describe('UserSubService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserSubService = TestBed.get(UserSubService);
    expect(service).toBeTruthy();
  });
});
