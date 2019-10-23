import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import { LangsActionTypes } from '../actions/langs.actions';



@Injectable()
export class LangsEffects {
  loadLangs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LangsActionTypes.LOAD_LANGS),
      mergeMap(() => this.api.getLangs()
        .pipe(
          map(resp => ({ type: LangsActionTypes.LOAD_LANGS_SUCCESS, payload: resp })),
          catchError(() => of({ type: LangsActionTypes.LOAD_LANGS_ERROR }))
        )
      )
    )
  );


  constructor(
    private actions$: Actions,
    private api: HttpService) {}

}
