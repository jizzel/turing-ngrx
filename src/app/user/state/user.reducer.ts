import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as UserActions from './user.actions';
export interface UserState {
  maskUserName: boolean;
  currentUser: string;
}

const initialState: UserState = {
  maskUserName: false,
  currentUser: 'Joe',
};

const getFeatureState = createFeatureSelector<UserState>('user');

export const getMaskUsername = createSelector(
  getFeatureState,
  state => state.maskUserName
);

export const getCurrentUser = createSelector(
  getFeatureState,
  state => state.currentUser
);

export const userReducer = createReducer(
  initialState,
  on(UserActions.maskUsername, (state): UserState => {
    return {
      ...state,
      maskUserName: !state.maskUserName
    };
  })
);
