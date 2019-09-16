import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import {Action, Store} from '@ngrx/store';
import { FiltersActionTypes } from '../actions/filters.actions';



@Injectable()
export class FiltersEffects {
  loadTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FiltersActionTypes.LOAD_TAGS),
      mergeMap(() => this.api.getTags()
        .pipe(
          map(resp => ({ type: FiltersActionTypes.LOAD_TAGS_SUCCESS, payload: resp })),
          catchError(() => of({ type: FiltersActionTypes.LOAD_TAGS_ERROR }))
        )
      )
    )
  );


  constructor(
    private actions$: Actions,
    private api: HttpService) {}

}
