import { MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';
import { types } from '../../types/types';
import * as filtersAction from '../actions/filters.actions';


export const filtersFeatureKey = 'filters';

export interface State {
  interests: any;
  skills: any;
  services: any;
}
export interface TagsChips {
  id: any;
  name: string;
}
// TagsSkills and tagsInterests contains "srchStr" key: string with lower case letters
export const initialState: State = {
  interests: [{
    id: null,
    name: '',
    srchStr: ''
  }],
  skills: [{
    id: null,
    name: '',
    srchStr: ''
  }],
  services: [{
    id: null,
    name: '',
    srchStr: ''
  }]
};

export function filtersReducer(state = initialState, action: any): State {
  switch (action.type) {
    case filtersAction.FiltersActionTypes.LOAD_TAGS_SUCCESS: {
      if (action.payload) {
        const tags = action.payload.data;
        const sortSkillsByFilter = _.orderBy(tags.skills, ['name', 'id'], ['asc', 'desc']);
        const sortInterestsByFilter = _.orderBy(tags.interests, ['name', 'id'], ['asc', 'desc']);
        const sortServicesByFilter = _.orderBy(tags.services, ['name', 'id'], ['asc', 'desc']);
        state.skills = sortSkillsByFilter;
        state.interests = sortInterestsByFilter;
        state.services = sortServicesByFilter;
        state.skills.forEach(el => {
          el.srchStr = _.lowerCase(el.name);
          });
        state.interests.forEach(el => {
            el.srchStr = _.lowerCase(el.name);
            });
        state.services.forEach(el => {
          el.srchStr = _.lowerCase(el.name);
          });
        return state;
      }
    }
    default:
      return state;
  }
}
export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];