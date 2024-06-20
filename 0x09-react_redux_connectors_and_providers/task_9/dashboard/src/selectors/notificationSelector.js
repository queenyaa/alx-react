// src/selectors/notificationSelector.js
import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

export const filterTypeSelected = state => state.filter || '';

export const getNotifications = state => {
  if (state && state.notifications && state.notifications.entities && state.notifications.entities.notifications) {
    return fromJS(state.notifications.entities.notifications);
  }
  return fromJS({});
};

export const getUnreadNotifications = createSelector(
  [getNotifications, filterTypeSelected],
  (notifications, filter) => {
    if (!notifications) {
      return [];
    }

    const immNotifications = fromJS(notifications);
    if (filter === 'URGENT') {
      return immNotifications
      .valueSeq()
      .filter(notification => !notification.isRead && notification.type === 'urgent')
      .toJS();
    } else {
      return immNotifications
        .filter(notification => !notification.isRead)
        .valueSeq()
        .toJS();
    }
    // return isImmutable(immNotifications) ? immNotifications.toJS() : [];
  }
);