import { MARK_AS_READ, SET_TYPE_FILTER, NotificationTypeFilters } from './notificationActionTypes';
import { markAsRead, setNotificationFilter } from './notificationActionCreators';

// Test for markAsRead action creator
test('markAsRead action', () => {
  const expectedAction = {
    type: MARK_AS_READ,
    index: 1,
  };
  expect(markAsRead(1)).toEqual(expectedAction);
});

// Test for setNotificationFilter action creator
test('setNotificationFilter action', () => {
  const expectedAction = {
    type: SET_TYPE_FILTER,
    filter: NotificationTypeFilters.DEFAULT,
  };
  expect(setNotificationFilter(NotificationTypeFilters.DEFAULT)).toEqual(expectedAction);
});