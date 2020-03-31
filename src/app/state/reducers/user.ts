import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../../environments/environment';

import { types } from '../../types/types';
import * as userAction from '../actions/user.actions';
import { Router } from '@angular/router';

export const stateFeatureKey = 'state';


export interface State {
  profile: types.ProfileUser;
  keyData: types.KeyData;
  contacts: Array<any> | [];
  posts: types.Posts;
  notifications: types.Notifications;
}
const userInitState: types.NewUser = {
  profile: {
    id: 0,
    email: '',
    avatar:'',
    socialNetworksProfiles: [],
    name: '',
    lastName:  '',
    birthDate:  '',
    placeOfBirth:  '',
    placeOfResidence:  '',
    rate: 0,
    profileSummary: null,
    profileStatus: null,
    langs: null,
    sex: '',
    userType: null
  },
  contacts: [],
  keyData: {
    skills: [],
    interests: [],
    education: [],
    goals: [],
    services: [],
    workExperience: [],
    skillsSkipped: false,
    goalsSkipped: false
  },
  posts: {
    public: [],
    saved: [],
    drafts: [],
    favorite: []
  },
  notifications: {
    ignored: [],
    deferred: [],
    system: [],
    chats: [],
    active: []
  }
};

export function userReducer(state: any, action: any)  {
  const updateState: types.NewUser = {...state};
  switch (action.type) {
    case userAction.UserActionTypes.LOAD_USER_SUCCESS: {
      const user = action.payload.data;
      state = user;
      return state;
    }
    case userAction.UserActionTypes.UPDATE_USER: {
      const user = action.payload.data;
      state = user;
      return state;
    }
    case userAction.UserActionTypes.RESET_USER: {
      state = undefined;
      return state;
    }
    case userAction.UserActionTypes.UPDATE_USERS_GOALS: {
      const data = action.payload;
      state.keyData.goals = data;
      return state;
    }
    case userAction.UserActionTypes.UPDATE_USERS_SERVICES: {
      const data = action.payload;
      state.keyData.services = data;
      return state;
    }
    case userAction.UserActionTypes.UPDATE_USERS_SKILLS: {
      const data = action.payload;
      state.keyData.skills = data;
      return state;
    }
    case userAction.UserActionTypes.UPDATE_USERS_NOTIFICATIONS_MATCHES: {
      const data = action.payload;
      if (state !== undefined) {
        state.notifications.active = data;
      }
      return state;
    }
    case userAction.UserActionTypes.LOAD_USER_ERROR: {
      const data = action.payload;
      if(data.status == 401) {
        state = undefined;
      }
      return state;
    }
    default:
      return state;
    }
  };

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
