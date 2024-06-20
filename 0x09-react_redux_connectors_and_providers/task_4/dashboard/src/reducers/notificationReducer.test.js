// reducers/notificationReducer.test.js

import { fromJS } from 'immutable';
import notificationReducer from './notificationReducer';
import { FETCH_NOTIFICATIONS_SUCCESS, SET_TYPE_FILTER, MARK_AS_READ } from '../actions/notificationActionTypes';
import { notificationsNormalizer } from '../schema/notifications';

describe('notificationReducer', () => {
  it('should return the default state', () => {
    const initialState = fromJS({
      notifications: {},
      filter: 'DEFAULT',
    });

    const state = notificationReducer(undefined, {});

    expect(state.toJS()).toEqual(initialState.toJS());
  });

  it('should handle FETCH_NOTIFICATIONS_SUCCESS', () => {
    const initialState = fromJS({
      notifications: {},
      filter: 'DEFAULT',
    });

    const action = {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
        { id: 3, type: "urgent", value: "New data available" },
      ],
    };

    const normalizedData = notificationsNormalizer(action.data);

    const expectedState = fromJS({
      filter: 'DEFAULT',
      notifications: normalizedData.entities.notifications,
      result: normalizedData.result,
    });

    const state = notificationReducer(initialState, action);

    expect(state.toJS()).toEqual(expectedState.toJS());
  });

  it('should handle SET_TYPE_FILTER', () => {
    const initialState = fromJS({
      notifications: {},
      filter: 'DEFAULT',
    });

    const action = {
      type: SET_TYPE_FILTER,
      filter: 'URGENT',
    };

    const expectedState = initialState.set('filter', 'URGENT');

    const state = notificationReducer(initialState, action);

    expect(state.toJS()).toEqual(expectedState.toJS());
  });

  it('should handle MARK_AS_READ', () => {
    const initialState = fromJS({
      filter: 'DEFAULT',
      notifications: {
        1: { id: 1, isRead: false, type: "default", value: "New course available" },
        2: { id: 2, isRead: false, type: "urgent", value: "New resume available" },
        3: { id: 3, isRead: false, type: "urgent", value: "New data available" },
      },
    });

    const action = {
      type: MARK_AS_READ,
      index: 2,
    };

    const expectedState = initialState.setIn(['notifications', '2', 'isRead'], true);

    const state = notificationReducer(initialState, action);

    expect(state.toJS()).toEqual(expectedState.toJS());
  });
});
