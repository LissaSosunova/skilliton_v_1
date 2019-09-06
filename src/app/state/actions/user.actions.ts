import { Action } from '@ngrx/store';


export enum UserActionTypes {
  LOAD_USER = '[User] Load User',
  
  
}

export class LoadUserData implements Action {
  readonly type = UserActionTypes.LOAD_USER;
}


export type UserActions = LoadUserData;
