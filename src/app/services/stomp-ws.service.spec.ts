import { TestBed } from '@angular/core/testing';

import { StompWsService } from './stomp-ws.service';

describe('StompWsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StompWsService = TestBed.get(StompWsService);
    expect(service).toBeTruthy();
  });
});
