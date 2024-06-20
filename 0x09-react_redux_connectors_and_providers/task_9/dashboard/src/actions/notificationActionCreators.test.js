import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  NotificationTypeFilters,
  FETCH_NOTIFICATIONS_SUCCESS,
  SET_LOADING_STATE,
  SET_NOTIFICATION_FILTER,
} from './notificationActionTypes';
import {
  markAsRead,
  setNotificationFilter,
  fetchNotifications,
  setLoadingState,
  setNotifications,
  setTypeFilter,
} from './notificationActionCreators';
import { thunk } from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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
    type: SET_NOTIFICATION_FILTER,
    filter: NotificationTypeFilters.DEFAULT,
  };
  expect(setNotificationFilter(NotificationTypeFilters.DEFAULT)).toEqual(expectedAction);
});

describe('fetchNotifications', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should fetch notifications successfully and dispatch actions', async () => {
    const store = mockStore({});

    // Mocking a successful fetch response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([
        { id: 1, type: 'default', value: 'New course available' }
      ])
    });

    const expectedActions = [
      setLoadingState(true), // Expected setLoadingState(true) action first
      setNotifications([{ id: 1, type: 'default', value: 'New course available' }]), // Expected setNotifications(data) action
      setLoadingState(false) // Expected setLoadingState(false) action after successful fetch
    ];

    await store.dispatch(fetchNotifications());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches the correct actions on success', async () => {
    const store = mockStore({}); // Initialize mock store

    // Mock the fetch request
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ id: 1, message: 'Notification 1' }])
    });

    const expectedActions = [
      { type: 'SET_LOADING_STATE', isLoading: true },
      { type: 'FETCH_NOTIFICATIONS_SUCCESS', notifications: [{ id: 1, message: 'Notification 1' }] },
      { type: 'SET_LOADING_STATE', isLoading: false }
    ];

    // Dispatch the async action creator and await its completion
    await store.dispatch(fetchNotifications());

    // Check if the dispatched actions match the expected actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('setLoadingState', () => {
  it('should create an action with the correct type and isLoading value', () => {
    const isLoading = true;
    const action = setLoadingState(isLoading);
    expect(action.type).toBe('SET_LOADING_STATE');
    expect(action.isLoading).toBe(isLoading);
  });

  it('should create an action with the correct type and false isLoading value when isLoading is not provided', () => {
    const action = setLoadingState();
    expect(action.type).toBe('SET_LOADING_STATE');
    expect(action.isLoading).toBe(false);
  });
});

describe('setNotifications', () => {
  it('should create an action with the correct type and notifications', () => {
    const notifications = [{ id: 1, type: 'default', value: 'New course available' }];
    const action = setNotifications(notifications);
    expect(action.type).toBe('FETCH_NOTIFICATIONS_SUCCESS');
    expect(action.notifications).toEqual(notifications);
  });

  it('should handle an empty array of notifications', () => {
    const action = setNotifications([]);
    expect(action.type).toBe('FETCH_NOTIFICATIONS_SUCCESS');
    expect(action.notifications).toEqual([]);
  });

  it('should handle a null value for notifications', () => {
    const action = setNotifications(null);
    expect(action.type).toBe('FETCH_NOTIFICATIONS_SUCCESS');
    expect(action.notifications).toBeNull();
  });

  it('should handle an undefined value for notifications', () => {
    const action = setNotifications(undefined);
    expect(action.type).toBe('FETCH_NOTIFICATIONS_SUCCESS');
    expect(action.notifications).toBeUndefined();
  });
});

describe('setNotifications', () => {
  it('should create an action with the correct type and notifications', () => {
    const notifications = [{ id: 1, type: 'default', value: 'New course available' }];
    const action = setNotifications(notifications);
    expect(action.type).toBe(FETCH_NOTIFICATIONS_SUCCESS);
    expect(action.notifications).toEqual(notifications);
  });

  it('should handle an empty array of notifications', () => {
    const action = setNotifications([]);
    expect(action.type).toBe(FETCH_NOTIFICATIONS_SUCCESS);
    expect(action.notifications).toEqual([]);
  });

  it('should handle a null value for notifications', () => {
    const action = setNotifications(null);
    expect(action.type).toBe(FETCH_NOTIFICATIONS_SUCCESS);
    expect(action.notifications).toBeNull();
  });

  it('should handle an undefined value for notifications', () => {
    const action = setNotifications(undefined);
    expect(action.type).toBe(FETCH_NOTIFICATIONS_SUCCESS);
    expect(action.notifications).toBeUndefined();
  });
});

describe('setTypeFilter', () => {
  it('should return an object with the correct type and filter', () => {
    const filter = 'URGENT';
    const expectedAction = {
      type: SET_TYPE_FILTER,
      filter,
    };
    expect(setTypeFilter(filter)).toEqual(expectedAction);
  });
});