import { Action } from '@ngrx/store';


export enum UserActionTypes {
  LOAD_USER = '[User] Load User',
  LOAD_USER_SUCCESS = '[User] Load User Success',
  LOAD_USER_ERROR = '[User] Load User Error' 
}

export class LoadUserData implements Action {
  readonly type = UserActionTypes.LOAD_USER;
}

export class LoadUserDataSuccess implements Action {
  readonly type = UserActionTypes.LOAD_USER_SUCCESS;
  constructor(public payload) { }
}

export class LoadUserDataError implements Action {
  type = UserActionTypes.LOAD_USER_ERROR;
  constructor(public payload) { }
}



export type UserActions = LoadUserData;
