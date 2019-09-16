import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { FiltersEffects } from './filters.effects';

describe('FiltersEffects', () => {
  let actions$: Observable<any>;
  let effects: FiltersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FiltersEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<FiltersEffects>(FiltersEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
