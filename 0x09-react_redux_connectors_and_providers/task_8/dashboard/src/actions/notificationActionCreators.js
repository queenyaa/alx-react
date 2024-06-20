import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  SET_LOADING_STATE,
  FETCH_NOTIFICATIONS_SUCCESS,
  SET_NOTIFICATION_FILTER
} from './notificationActionTypes';
import 'node-fetch';
import { myNotifications } from '../../dist/notifications.json'
// import { fetchNotifications } from './notificationActionCreators';

export const setLoadingState = (isLoading = false) => ({
  type: SET_LOADING_STATE,
  isLoading,
});

// Action creator for marking a notification as read
export const markAsRead = (index) => ({
  type: MARK_AS_READ,
  index,
});

export const boundMarkAsRead = (index) => (dispatch) => dispatch(markAsRead(index));

export const boundSetNotificationFilter = (filter) => (dispatch) => dispatch(setNotificationFilter(filter));

export const setNotifications = (notifications) => ({
  type: FETCH_NOTIFICATIONS_SUCCESS,
  notifications,
});

export const setTypeFilter = (filter) => ({
  type: SET_TYPE_FILTER,
  filter,
});

export const setNotificationFilter = filter => ({
  type: SET_NOTIFICATION_FILTER,
  filter,
});

export const fetchNotifications = () => {
  return (dispatch) => {
    dispatch(setLoadingState(true));
    return fetch("./notifications.json")
      .then((res) => res.json())
      .then((data) => dispatch(setNotifications(data)))
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      })
      .finally(() => dispatch(setLoadingState(false)));
  };
};