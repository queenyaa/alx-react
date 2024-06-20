// src/selectors/notificationSelector.js
import { createSelector } from 'reselect';

export const filterTypeSelected = state => state.filter;

export const getNotifications = state => state.notifications.entities.notifications;

export const getUnreadNotifications = createSelector(
  getNotifications,
  (notifications) => notifications
    .valueSeq()
    .filter(notification => !notification.isRead)
);
