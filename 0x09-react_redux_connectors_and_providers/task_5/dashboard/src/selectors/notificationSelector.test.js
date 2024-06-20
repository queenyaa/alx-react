// src/selectors/notificationSelector.test.js
import { fromJS } from 'immutable';
import { filterTypeSelected, getNotifications, getUnreadNotifications } from './notificationSelector';

const state = fromJS({
  filter: 'DEFAULT',
  notifications: {
    1: { id: 1, isRead: false, type: 'default', value: 'New course available' },
    2: { id: 2, isRead: false, type: 'urgent', value: 'New resume available' },
    3: { id: 3, isRead: true, type: 'urgent', value: 'New data available' },
  }
});

describe('notification selectors', () => {
  it('filterTypeSelected should return the filter type', () => {
    expect(filterTypeSelected(state)).toEqual('DEFAULT');
  });

  it('getNotifications should return the list of notifications', () => {
    expect(getNotifications(state).toJS()).toEqual({
      1: { id: 1, isRead: false, type: 'default', value: 'New course available' },
      2: { id: 2, isRead: false, type: 'urgent', value: 'New resume available' },
      3: { id: 3, isRead: true, type: 'urgent', value: 'New data available' },
    });
  });

  it('getUnreadNotifications should return the list of unread notifications', () => {
    const expectedUnreadNotifications = [
      { id: 1, isRead: false, type: 'default', value: 'New course available' },
      { id: 2, isRead: false, type: 'urgent', value: 'New resume available' }
    ];
    const receivedUnreadNotifications = getUnreadNotifications(state).map(item => item.toJS());
    expect(receivedUnreadNotifications).toEqual(expectedUnreadNotifications);
  });

});
