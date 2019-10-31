import { Action } from '@ngrx/store';

export enum GlobalSearchActionTypes {
  SET_SEARCH_RESULT = '[Search] Set new Search Result'
}

export class SetGlobalSearch implements Action {
  readonly type = GlobalSearchActionTypes.SET_SEARCH_RESULT;
  constructor(public payload) { }
}


export type GlobalSearchActions = SetGlobalSearch;
