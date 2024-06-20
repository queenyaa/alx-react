// reducers/notificationReducer.test.js

import { fromJS } from 'immutable';
import notificationReducer from './notificationReducer';
import { FETCH_NOTIFICATIONS_SUCCESS, SET_TYPE_FILTER, MARK_AS_READ } from '../actions/notificationActionTypes';
import { notificationsNormalizer } from '../schema/notifications';
import { getLatestNotification } from '../utils/utils';
import { NotificationTypeFilters } from '../actions/notificationActionTypes';
import { initialState } from './notificationReducer';

describe('notificationReducer', () => {

  const initialState = fromJS({
    notifications: [
      { id: 1, html: { __html: '<u>New course available</u>' }, type: 'default', value: 'New course available' },
      { id: 2, html: { __html: '<u>New resume available</u>' }, type: 'urgent', value: 'New resume available' },
      { id: 3, html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' }, type: 'urgent' },
    ],
    loading: false,
    filter: NotificationTypeFilters.DEFAULT,
  });

  it('should return the default state', () => {
    expect(notificationReducer(undefined, {})).toEqual(initialState);
    });

    // const state = notificationReducer(undefined, {});

    // expect(state.toJS()).toEqual(initialState.toJS());
  });

  it('should handle FETCH_NOTIFICATIONS_SUCCESS', () => {
    const notificationsData = fromJS({
      notifications: [
        { id: 1, html: { __html: '<u>New course available</u>' }, type: 'default', value: 'New course available' },
        { id: 2, html: { __html: '<u>New resume available</u>' }, type: 'urgent', value: 'New resume available' },
        { id: 3, html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' }, type: 'urgent' },
      ],
      // loading: false,
      // filter: NotificationTypeFilters.DEFAULT,
    });
    const action = {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      notifications: notificationsData,
    };

    const expectedState = fromJS({
      notifications: notificationsData,
      loading: false,
      filter: NotificationTypeFilters.DEFAULT,
    });

    // const normalizedData = notificationsNormalizer(action.notifications);
    const state = notificationReducer(initialState, action);

    expect(state.toJS()).toEqual(expectedState.toJS());
  });

  it('should handle SET_TYPE_FILTER', () => {
    const initialState = fromJS({
    notifications: [
      { id: 1, html: { __html: '<u>New course available</u>' }, type: 'default', value: 'New course available' },
      { id: 2, html: { __html: '<u>New resume available</u>' }, type: 'urgent', value: 'New resume available' },
      { id: 3, html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' }, type: 'urgent' },
    ],
    loading: false,
    filter: NotificationTypeFilters.DEFAULT,
  });

    const action = {
      type: SET_TYPE_FILTER,
      filter: NotificationTypeFilters.URGENT,
    };

    const expectedState = initialState.set('filter', NotificationTypeFilters.URGENT);

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

