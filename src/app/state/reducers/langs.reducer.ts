import { MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';
import { types } from '../../types/types';
import * as LangsActions from '../actions/langs.actions';


export const langsFeatureKey = 'langs';

export interface State {
  langs: any;
}
export interface TagsChips {
  id: any;
  name: string;
}

export const initialState: State = {
  langs: [{
    id: null,
    native: "",
    name: "",
    srchStr: ''
  }]
};


export function langsReducer(state = initialState, action: any): State {
  switch (action.type) {
    case LangsActions.LangsActionTypes.LOAD_LANGS_SUCCESS: {
      if(action.payload){
        const langs = action.payload.data;
        const sortLangsByFilter = _.orderBy(langs, ['name', 'id'], ['asc', 'desc']);
        state.langs = sortLangsByFilter;
        state.langs.forEach(el => {
             el.srchStr = _.lowerCase(el.native) + _.lowerCase(el.name);
             });
        return state;
      }
    }
      default:
      return state;
  }
}
export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
