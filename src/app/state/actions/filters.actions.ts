import { Action } from '@ngrx/store';

export enum FiltersActionTypes {
  LOAD_TAGS = '[Tags] Load Tags',
  LOAD_TAGS_SUCCESS = '[Tags] Load Tags Success',
  LOAD_TAGS_ERROR = '[Tags] Load Tags Error'
  
  
}

export class LoadTags implements Action {
  readonly type = FiltersActionTypes.LOAD_TAGS;
}

export class LoadTagsSuccess implements Action {
  readonly type = FiltersActionTypes.LOAD_TAGS_SUCCESS;
  constructor(public payload) { }
}

export class LoadTagsError implements Action {
  type = FiltersActionTypes.LOAD_TAGS_ERROR;
  constructor(public payload) { }
}


export type FiltersActions = LoadTags;
