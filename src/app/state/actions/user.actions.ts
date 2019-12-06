import { Action } from '@ngrx/store';


export enum UserActionTypes {
  LOAD_USER = '[User] Load User',
  LOAD_USER_SUCCESS = '[User] Load User Success',
  LOAD_USER_ERROR = '[User] Load User Error',
  RESET_USER = '[User] Reset User Data',
  UPDATE_USER = '[User] Update or set User Data',
  UPDATE_USERS_GOALS = '[User] Update User KeyData Goals',
  UPDATE_USERS_SERVICES = '[User] Update User KeyData Services',
  UPDATE_USERS_SKILLS = '[User] Update User KeyData Skills',
  UPDATE_USERS_NOTIFICATIONS_MATCHES = '[User] Update User Notifications Matches',
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

export class ResetUserData implements Action {
  readonly type = UserActionTypes.RESET_USER;
}

export class UpdateUsersGoals implements Action {
  type = UserActionTypes.UPDATE_USERS_GOALS;
  constructor(public payload) { }
}

export class UpdateUser implements Action {
  type = UserActionTypes.UPDATE_USER;
  constructor(public payload) { }
}

export class UpdateUsersServices implements Action {
  type = UserActionTypes.UPDATE_USERS_SERVICES;
  constructor(public payload) { }
}

export class UpdateUsersSkills implements Action {
  type = UserActionTypes.UPDATE_USERS_SKILLS;
  constructor(public payload) { }
}

export class UpdateUsersNotificationsMatches implements Action {
  type = UserActionTypes.UPDATE_USERS_NOTIFICATIONS_MATCHES;
  constructor(public payload) { }
}


export type UserActions = LoadUserData;
