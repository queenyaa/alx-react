// reducers/notificationReducer.js

import { fromJS } from 'immutable';
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  SET_TYPE_FILTER,
  MARK_AS_READ,
  SET_LOADING_STATE
} from '../actions/notificationActionTypes';
import { notificationsNormalizer } from '../schema/notifications';
import { getLatestNotification } from '../utils/utils';
import { NotificationTypeFilters } from '../actions/notificationActionTypes';

const initialState = fromJS({
  notifications: [
    { id: 1, html: { __html: '<u>New course available</u>' }, type: 'default', value: 'New course available' },
    { id: 2, html: { __html: '<u>New resume available</u>' }, type: 'urgent', value: 'New resume available' },
    { id: 3, html: { __html: '<u>Urgent requirement - complete by EOD</u>' }, type: 'urgent', html: {__html: getLatestNotification() } },
  ],
  loading: false,
  filter: NotificationTypeFilters.DEFAULT,
});

const notificationReducer = (state = initialState, action ) => {
  switch (action.type) {
    case SET_LOADING_STATE:
      return state.set('loading', action.isLoading);
    case FETCH_NOTIFICATIONS_SUCCESS:
      return state.mergeDeep({ notifications: fromJS(action.notifications), loading: false });
    case SET_TYPE_FILTER:
      return state.set('filter', action.filter);
    case MARK_AS_READ:
      return state.setIn(['notifications', action.index.toString(), 'isRead'], true);
    default:
      return state;
  }
};

export default notificationReducer;