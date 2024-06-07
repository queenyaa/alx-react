import { MARK_AS_READ, SET_TYPE_FILTER } from './notificationActionTypes';

// Action creator for marking a notification as read
export const markAsRead = (index) => ({
  type: MARK_AS_READ,
  index,
});

export const boundMarkAsRead = (index) => (dispatch) => dispatch(markAsRead(index));

// Action creator for setting the notification filter
export const setNotificationFilter = (filter) => ({
  type: SET_TYPE_FILTER,
  filter,
});

export const boundSetNotificationFilter = (filter) => (dispatch) => dispatch(setNotificationFilter(filter));