import { Action } from '@ngrx/store';

export enum LocationsActionTypes {
  LOAD_LOCATIONS = '[Locations] Load Locations',
  LOAD_LOCATIONS_SUCCESS = '[Locations] Load Locations success',
  LOAD_LOCATIONS_ERROR = '[Locations] Load Locations error',
  LOAD_CITIES = '[Cities] Load Locations',
  LOAD_CITIES_SUCCESS = '[Cities] Load Locations success',
  LOAD_CITIES_ERROR = '[Cities] Load Locations error',
}

export class LoadLocations implements Action {
  readonly type = LocationsActionTypes.LOAD_LOCATIONS;
}
export class LoadLocationsSuccess implements Action {
  readonly type = LocationsActionTypes.LOAD_LOCATIONS_SUCCESS;
  constructor(public payload) { }
}

export class LoadLocationsError implements Action {
  type = LocationsActionTypes.LOAD_LOCATIONS_ERROR;
  constructor(public payload) { }
}

export class LoadCities implements Action {
  readonly type = LocationsActionTypes.LOAD_CITIES;
  constructor(public payload) { }
}
export class LoadCitiesSuccess implements Action {
  readonly type = LocationsActionTypes.LOAD_CITIES_SUCCESS;
  constructor(public payload) { }
}

export class LoadCitiesError implements Action {
  type = LocationsActionTypes.LOAD_CITIES_ERROR;
  constructor(public payload) { }
}


export type LocationsActions = LoadLocations;
