import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LangsEffects } from './langs.effects';

describe('AppEffects', () => {
  let actions$: Observable<any>;
  let effects: LangsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LangsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<LangsEffects>(LangsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
