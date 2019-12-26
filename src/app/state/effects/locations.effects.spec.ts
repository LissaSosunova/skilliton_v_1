import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LocationsEffects } from './locations.effects';

describe('LocationsEffects', () => {
  let actions$: Observable<any>;
  let effects: LocationsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocationsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<LocationsEffects>(LocationsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
