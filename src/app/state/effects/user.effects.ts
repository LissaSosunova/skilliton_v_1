import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import { Action, Store} from '@ngrx/store';
import { UserActionTypes, LoadUserDataError } from '../actions/user.actions';
import { Router } from '@angular/router';


@Injectable()
export class UserEffects {
  private router: Router;
    loadUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.LOAD_USER),
      mergeMap(() => this.api.getUser()
        .pipe(
          map(resp => ({ type: UserActionTypes.LOAD_USER_SUCCESS, payload: resp })),
          catchError(error => of(new LoadUserDataError(error)))
        )
      )
    )
  );



  constructor(
    private actions$: Actions,
    private api: HttpService) {}

}
