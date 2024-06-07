// reducers/uiReducer.test.js

import uiReducer from './uiReducer';
import initialState from './uiReducer';
import {
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
} from '../actions/uiActionTypes';

describe('uiReducer', () => {
  it('should return the initial state when no action is passed', () => {
    const newState = uiReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });

  it('should return the initial state when an unknown action is passed', () => {
    const newState = uiReducer(initialState, { type: 'UNKNOWN_ACTION' });
    expect(newState).toEqual(initialState);
  });

  it('should set isNotificationDrawerVisible to true when DISPLAY_NOTIFICATION_DRAWER action is passed', () => {
    const newState = uiReducer(initialState, { type: DISPLAY_NOTIFICATION_DRAWER });
    expect(newState.isNotificationDrawerVisible).toBe(true);
  });

  it('should set isNotificationDrawerVisible to false when HIDE_NOTIFICATION_DRAWER action is passed', () => {
    const newState = uiReducer(
      { ...initialState, isNotificationDrawerVisible: true },
      { type: HIDE_NOTIFICATION_DRAWER }
    );
    expect(newState.isNotificationDrawerVisible).toBe(false);
  });

  it('should set isUserLoggedIn to true when LOGIN_SUCCESS action is passed', () => {
    const newState = uiReducer(initialState, { type: LOGIN_SUCCESS });
    expect(newState.isUserLoggedIn).toBe(true);
  });

  it('should set isUserLoggedIn to false when LOGIN_FAILURE action is passed', () => {
    const newState = uiReducer(initialState, { type: 'LOGIN_FAILURE' });
    expect(newState.isUserLoggedIn).toBe(false);
  });

  it('should set isUserLoggedIn to false when LOGOUT action is passed', () => {
    const newState = uiReducer(
      { ...initialState, isUserLoggedIn: true },
      { type: 'LOGOUT' }
    );
    expect(newState.isUserLoggedIn).toBe(false);
  });
});
