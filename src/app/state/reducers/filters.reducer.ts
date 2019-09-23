import { MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';
import { types } from '../../types/types';
import * as filtersAction from '../actions/filters.actions';


export const filtersFeatureKey = 'filters';

export interface State {
  tagsArr: any;
  tagsSkills: any;
  tagsInterests: any;
}
export interface TagsChips {
  value: any;
  name: string;
}
// TagsSkills and tagsInterests contains "srchStr" key: string with lower case letters
export const initialState: State = {
  tagsArr: [{
    tagId: null,
    tagName: "",
    categoryId: null,
    categoryName: null
  }],
  tagsSkills: [],
  tagsInterests: []
};

export function filtersReducer(state = initialState, action: any): State {
  switch (action.type) {
    case filtersAction.FiltersActionTypes.LOAD_TAGS_SUCCESS: {
      if(action.payload){
        const tags: Array<any> = action.payload;
        state.tagsArr = tags;
        state.tagsArr.forEach(el => {
          if(el.categoryId === null){
            state.tagsSkills.push(
              {value: el.tagId,
                name: el.tagName,
                categoryName: "",
                srchStr: _.lowerCase(el.tagName)});
            state.tagsInterests.push(
              {value: el.tagId,
                name: el.tagName,
                srchStr: _.lowerCase(el.tagName)});
          } else {
            state.tagsSkills.push(
              {value: el.tagId,
              name: el.tagName,
              categoryName: el.categoryName,
              srchStr: _.lowerCase(el.tagName)});
          }
        });
        return state;
      }
    }
    default:
      return state;
  }
}
export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];