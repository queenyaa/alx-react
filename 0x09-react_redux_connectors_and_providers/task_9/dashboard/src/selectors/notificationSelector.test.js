// src/selectors/notificationSelector.test.js
import { fromJS } from 'immutable';
import { filterTypeSelected, getNotifications, getUnreadNotifications } from './notificationSelector';

const state = fromJS({
  filter: 'DEFAULT',
  notifications: {
    entities: {
      notifications: {
        1: { id: 1, isRead: false, type: 'default', value: 'New course available' },
        2: { id: 2, isRead: false, type: 'urgent', value: 'New resume available' },
        3: { id: 3, isRead: true, type: 'urgent', value: 'New data available' },
      }
    }
  }
}); 

describe('notification selectors', () => {

  it('getNotifications should return the list of notifications', () => {
    const state = fromJS({
      notifications: {
        entities: {
          notifications: {
            1: { id: 1, isRead: false, type: 'default', value: 'New course available' },
            2: { id: 2, isRead: false, type: 'urgent', value: 'New resume available' },
            3: { id: 3, isRead: true, type: 'urgent', value: 'New data available' },
          }
        }
      }
    });

    const expectedNotifications = fromJS([
      { id: 1, isRead: false, type: 'default', value: 'New course available' },
      { id: 2, isRead: false, type: 'urgent', value: 'New resume available' },
      { id: 3, isRead: true, type: 'urgent', value: 'New data available' },
    ]);

    const receivedNotifications = getNotifications(state);

    expect(receivedNotifications).toEqual(expectedNotifications);
  });

  it('getNotifications should return an empty list when the state is missing', () => {
    const state = fromJS({});

    const expectedNotifications = fromJS([]);

    const receivedNotifications = getNotifications(state);

    expect(receivedNotifications).toEqual(expectedNotifications);
  });
  
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

  it('getUnreadNotifications should return the list of unread urgent notifications when the filter is set', () => {
    const stateWithUrgentFilter = state.setIn(['filter'], NotificationTypeFilters.URGENT);
    const expectedUnreadNotifications = [
      { id: 2, isRead: false, type: 'urgent', value: 'New resume available' },
    ];
    const receivedUnreadNotifications = getUnreadNotifications(stateWithUrgentFilter).map(item => item.toJS());
    expect(receivedUnreadNotifications).toEqual(expectedUnreadNotifications);
  });

});
