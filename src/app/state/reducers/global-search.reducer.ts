import { MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';
import { types } from '../../types/types';
import * as GlobalSearchActions from '../actions/global-search.actions';


export const globalSearchFeatureKey = 'globalSearch';

export interface State {
  library: Array<any>;
  people: Array<any>;
  posts: Array<any>;
  skills: Array<any>;
}

export const initialState: State = {
  library: [],
  people: [],
  posts: [],
  skills: []
};


export function globalSearchReducer(state = initialState, action: any): State {
  switch (action.type) {
    case GlobalSearchActions.GlobalSearchActionTypes.SET_SEARCH_RESULT: {
      if (action.payload) {
      state = action.payload.data;
      return state;
      }
    }
      default:
      return state;
  }
}
export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
