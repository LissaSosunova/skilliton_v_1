import { MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';
import * as LocationsActions from '../actions/locations.actions';


export const locationsFeatureKey = 'locations';

export interface State {
  countries: any;
  target: {
    id: number;
    country: string;
    cities: []
  };
}

export const initialState: State = {
  countries: [{
    id: null,
    country: "",
    cities: null
  }],
  target: {
    id: null,
    country: "",
    cities: []
}
};

export function locationsReducer(state = initialState, action: any): State {
  switch (action.type) {
    case LocationsActions.LocationsActionTypes.LOAD_LOCATIONS_SUCCESS: {
      if(action.payload){
        state.countries = action.payload.data;
        return state;
      }
    }
    case LocationsActions.LocationsActionTypes.LOAD_CITIES_SUCCESS: {
      if(action.payload){
        state.target = action.payload.data;
        return state;
      }
    }
      default:
      return state;
  }
}
export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];