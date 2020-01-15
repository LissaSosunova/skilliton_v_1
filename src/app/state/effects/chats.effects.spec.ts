import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ChatsEffects } from './chats.effects';

describe('ChatsEffects', () => {
  let actions$: Observable<any>;
  let effects: ChatsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChatsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<ChatsEffects>(ChatsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
