import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import * as LocationsActions from '../actions/locations.actions';



@Injectable()
export class LocationsEffects {
    loadLocations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationsActions.LocationsActionTypes.LOAD_LOCATIONS),
      mergeMap(() => this.api.getAllCountries()
        .pipe(
          map(resp => ({ type: LocationsActions.LocationsActionTypes.LOAD_LOCATIONS_SUCCESS, payload: resp })),
          catchError(() => of({ type: LocationsActions.LocationsActionTypes.LOAD_LOCATIONS_ERROR }))
        )
      )
    )
  );

  loadCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationsActions.LocationsActionTypes.LOAD_CITIES),
      mergeMap(({payload: id}) => this.api.getCitiesByID(id)
        .pipe(
          map(resp => ({ type: LocationsActions.LocationsActionTypes.LOAD_CITIES_SUCCESS, payload: resp })),
          catchError(() => of({ type: LocationsActions.LocationsActionTypes.LOAD_CITIES_ERROR }))
        )
      )
    )
  );



  constructor(
    private actions$: Actions,
    private api: HttpService) {}

}
