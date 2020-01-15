import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect} from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import {Action, Store} from '@ngrx/store';
import { ChatsActionTypes,
  LoadCurrentChatSuccess,
  LoadCurrentChatError,
  LoadChatsSuccess,
  LoadChatsError
 } from '../actions/chats.actions';



@Injectable()
export class ChatsEffects {


  @Effect() loadChats$ = this.actions$
  .pipe(
    ofType(ChatsActionTypes.LOAD_CHATS),
    mergeMap(
      () => this.api.getChatList()
        .pipe(
          map(resp => {
            return new LoadChatsSuccess(resp);
          }),
          catchError(error => of(new LoadChatsError(error)))
        )
    ),
  );

  @Effect() loadChat$ = this.actions$
  .pipe(
    ofType(ChatsActionTypes.LOAD_CURRENT_CHAT),
    mergeMap(
      (action) => this.api.getChat((action as any).payload)
        .pipe(
          map(resp => {
            return new LoadCurrentChatSuccess(resp);
          }),
          catchError(error => of(new LoadCurrentChatError(error)))
        )
    ),
);

  constructor(
    private actions$: Actions,
    private api: HttpService) {}

}
