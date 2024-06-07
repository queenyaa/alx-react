// reducers/notificationReducer.test.js

import notificationReducer from './notificationReducer';
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
} from '../actions/notificationActionTypes';

describe('notificationReducer', () => {
  it('should return the default state when no action is passed', () => {
    const newState = notificationReducer(undefined, {});
    expect(newState).toEqual({
      notifications: [],
      filter: 'DEFAULT',
    });
  });

  it('should update notifications when FETCH_NOTIFICATIONS_SUCCESS action is dispatched', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', value: 'New data available' },
    ];
    const action = { type: FETCH_NOTIFICATIONS_SUCCESS, data: notifications };
    const newState = notificationReducer(undefined, action);
    expect(newState.notifications).toEqual([
      { id: 1, type: 'default', value: 'New course available', isRead: false },
      { id: 2, type: 'urgent', value: 'New resume available', isRead: false },
      { id: 3, type: 'urgent', value: 'New data available', isRead: false },
    ]);
  });
});

// Test case: FETCH_NOTIFICATIONS_SUCCESS action
test('should return new state with notifications and filter when FETCH_NOTIFICATIONS_SUCCESS action is dispatched', () => {
    const initialState = {
      notifications: [],
      filter: 'DEFAULT',
    };
  
    const action = {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', value: 'New data available' },
      ],
    };
  
    const expectedState = {
      notifications: [
        { id: 1, type: 'default', value: 'New course available', isRead: false },
        { id: 2, type: 'urgent', value: 'New resume available', isRead: false },
        { id: 3, type: 'urgent', value: 'New data available', isRead: false },
      ],
      filter: 'DEFAULT',
    };
  
    const newState = notificationReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  
  // Test case: MARK_AS_READ action
  test('should return new state with updated notifications when MARK_AS_READ action is dispatched', () => {
    const initialState = {
      notifications: [
        { id: 1, type: 'default', value: 'New course available', isRead: false },
        { id: 2, type: 'urgent', value: 'New resume available', isRead: false },
        { id: 3, type: 'urgent', value: 'New data available', isRead: false },
      ],
      filter: 'DEFAULT',
    };
  
    const action = {
      type: MARK_AS_READ,
      index: 1,
    };
  
    const expectedState = {
      notifications: [
        { id: 1, type: 'default', value: 'New course available', isRead: true },
        { id: 2, type: 'urgent', value: 'New resume available', isRead: false },
        { id: 3, type: 'urgent', value: 'New data available', isRead: false },
      ],
      filter: 'DEFAULT',
    };
  
    const newState = notificationReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  
  // Test case: SET_TYPE_FILTER action
  test('should return new state with updated filter when SET_TYPE_FILTER action is dispatched', () => {
    const initialState = {
      notifications: [],
      filter: 'DEFAULT',
    };
  
    const action = {
      type: SET_TYPE_FILTER,
      filter: 'URGENT',
    };
  
    const expectedState = {
      notifications: [],
      filter: 'URGENT',
    };
  
    const newState = notificationReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  
  // Test case: default case
  test('should return the same state when an unknown action is dispatched', () => {
    const initialState = {
      notifications: [],
      filter: 'DEFAULT',
    };
  
    const action = {
      type: 'UNKNOWN_ACTION',
    };
  
    const newState = notificationReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });