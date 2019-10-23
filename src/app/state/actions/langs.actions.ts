import { Action } from '@ngrx/store';


export enum LangsActionTypes {
  LOAD_LANGS = '[Langs] Load Langs',
  LOAD_LANGS_SUCCESS = '[Langs] Load Langs Success',
  LOAD_LANGS_ERROR = '[Langs] Load Langs Error'
}

export class LoadLangsData implements Action {
  readonly type = LangsActionTypes.LOAD_LANGS;
}

export class LoadLangsDataSuccess implements Action {
  readonly type = LangsActionTypes. LOAD_LANGS_SUCCESS;
  constructor(public payload) { }
}

export class LoadLangsDataError implements Action {
  type = LangsActionTypes.LOAD_LANGS_ERROR;
  constructor(public payload) { }
}

export type LangsActions = LoadLangsData;
