import { MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';
import { types } from '../../types/types';
import * as mateAction from '../actions/mate.actions';


export const mateFeatureKey = 'mateReducer';

export interface State {
  profile: types.ProfileUser;
  keyData: types.KeyData;
};

export const initialState: State = {
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
  keyData: {
    skills: [],
    interests: [],
    education: [],
    goals: [],
    services: [],
    workExperience: [],
    skillsSkipped: false,
    goalsSkipped: false
  }
};

export function mateReducer(state: any, action: any)  {
  switch (action.type) {
    case mateAction.MateActionTypes.LoadMate: {
      const mate = action.payload.data;
      state = mate;
      return state;
    }
    default:
      return state;
    }
  };

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

