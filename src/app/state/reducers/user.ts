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
    langs: null,
    sex: '',
  },
  contacts: [],
  keyData: {
    skills: [],
    interests: [],
    education: [],
    goals: [],
    myServices: [],
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
    default:
      return state;
    }
  };

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];



// export function userReducer(state = userInitState, action: any) {
//   const actions = {
//     [userAction.UserActionTypes.LOAD_USER]: (): State => ({
//       ...state,
//     }),
//     [userAction.UserActionTypes.LOAD_USER_SUCCESS]: (): State => {
//       return ({
//         ...state,
//         userInitState: action.payload
//       });
//     }
//     }
  

//   return actions[action.type] ? actions[action.type]() : state;
// }
