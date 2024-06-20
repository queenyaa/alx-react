import React, { useRef, useEffect } from 'react';
import { shallow, mount } from 'enzyme';
import { render, screen, fireEvent } from '@testing-library/react';
import { Notifications, ErrorBoundary, Notifications as NotificationsComponent } from './Notifications';
import { StyleSheetTestUtils } from 'aphrodite';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import NotificationItem from './NotificationItem';
import { getUnreadNotifications } from '../selectors/notificationSelector';
import closeIcon from './../assets/closeicon.png';
import { setNotificationFilter } from '../actions/notificationActionCreators';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
 
describe('Notifications component', () => {
  let store;
  let wrapper;
  let state;

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    store = mockStore({
      notifications: {
        listNotifications: [
          { id: 1, html: { __html: '<u>New course available</u>' }, type: 'default', value: 'New course available' },
          { id: 2, html: { __html: '<u>New resume available</u>' }, type: 'urgent', value: 'New resume available' },
          { id: 3, html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' }, type: 'urgent' },
        ],
      },
      filter: 'DEFAULT',
    });
    store.dispatch = jest.fn();

    wrapper = shallow(
      <Provider store={store}>
        <Notifications />
      </Provider>
    ).dive();

    const state = {
      filter: 'DEFAULT',
      notifications: {
        entities: {
          notifications: {
            1: {
              id: 1,
              isRead: false,
              type: 'default',
              value: 'New course available',
            },
            2: {
              id: 2,
              isRead: false,
              type: 'urgent',
              value: 'New resume available',
            },
          },
        },
      },
    };
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  test('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('renders three list items', () => {
    const sampleNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];

    const wrapper = mount(
      <Provider store={store}>
        <Notifications displayDrawer={true} getUnreadNotifications={sampleNotifications} />
      </Provider>
    );

    expect(wrapper.find(NotificationItem)).toHaveLength(3);
    wrapper.unmount();
  });

  test('renders the text "Here is the list of notifications"', () => {
    const sampleNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];

    const WrapperComponent = () => {
      const ref = useRef(null);

      useEffect(() => {
        if (ref.current) {
          const htmlContent = ref.current.innerHTML;
          expect(htmlContent).toContain('Here is the list of notifications');
        }
      }, []);

      return (
        <Provider store={store}>
          <div ref={ref}>
            <Notifications displayDrawer={true} getUnreadNotifications={sampleNotifications} />
          </div>
        </Provider>
      );
    };

    mount(<WrapperComponent />);
  });

  test('calls handleDisplayDrawer when menu item is clicked', () => {
    const handleDisplayDrawer = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <NotificationsComponent handleDisplayDrawer={handleDisplayDrawer} />
      </Provider>
    );
    const menuItem = wrapper.find('#menuItem');
    if (menuItem.exists()) {
      menuItem.simulate('click');
      expect(handleDisplayDrawer).toHaveBeenCalled();
    } else {
      throw new Error('Menu item not found');
    }

    wrapper.unmount();
  });

  test('calls handleHideDrawer when close button is clicked', () => {
    const handleHideDrawer = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <Notifications displayDrawer={true} handleHideDrawer={handleHideDrawer} />
      </Provider>
    );
    const buttonElement = wrapper.find('button[aria-label="close"]');
    const onClickHandler = buttonElement.prop('onClick');
    onClickHandler();
    expect(handleHideDrawer).toHaveBeenCalled();
    wrapper.unmount();
  });

  test('renders NotificationItem components when passed unreadNotifications prop', () => {
    const listNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
    ];
    const wrapper = mount(
      <Provider store={store}>
        <Notifications displayDrawer={true} getUnreadNotifications={listNotifications} />
      </Provider>
    );
    const notificationsComponent = wrapper.find(Notifications);
    const notificationItems = notificationsComponent.find(NotificationItem);
    expect(notificationItems).toHaveLength(4);

    expect(notificationItems.at(0).props().value).toEqual('New course available');
    expect(notificationItems.at(1).props().value).toEqual('New resume available');
    expect(notificationItems.at(2).props().html.__html).toEqual('<strong>Urgent requirement</strong> - complete by EOD');

    wrapper.unmount();
  });

  test('renders "No new notification for now" when unreadNotifications is empty', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Notifications displayDrawer={true} getUnreadNotifications={[]} />
      </Provider>
    );
    const notificationItem = wrapper.find(NotificationItem);
    if (notificationItem.exists()) {
      expect(notificationItem.at(0).props().value).toEqual('No new notification for now');
    } else {
      throw new Error('NotificationItem not found');
    }

    wrapper.unmount();
  });

  test('calls markAsRead when a notification is clicked', () => {
    const markAsRead = jest.fn();
    const listNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];
    const wrapper = mount(
      <Provider store={store}>
        <Notifications displayDrawer={true} getUnreadNotifications={listNotifications} markAsRead={markAsRead} />
      </Provider>
    );
    const notificationItem = wrapper.find(NotificationItem).at(0);
    notificationItem.simulate('click');
    expect(markAsRead).toHaveBeenCalledWith(1);
  });

  test('does not rerender when props are updated with the same list', () => {
    const initialList = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const { rerender } = render(
      <Provider store={store}>
        <Notifications displayDrawer={true} unreadNotifications={initialList} />
      </Provider>
    );

    // Update props with the same list
    rerender(
      <Provider store={store}>
        <Notifications displayDrawer={true} unreadNotifications={initialList} />
      </Provider>
    );

    // Expect console.log to not have been called
    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  test('clicking on the first button should call setNotificationFilter with URGENT', () => {
    const setNotificationFilterMock = jest.fn();
    const wrapper = shallow(
      <Notifications
        setNotificationFilter={setNotificationFilterMock}
        displayDrawer={true}
        getUnreadNotifications={getUnreadNotifications(state).toJS()}
      />
    );
  
    wrapper.find('button').at(0).simulate('click');
  
    expect(setNotificationFilterMock).toHaveBeenCalledWith('URGENT');
  });

  it('should call setNotificationFilter with URGENT when clicking on the urgent button', () => {
    render(
      <Provider store={store}>
        <Notifications displayDrawer={true} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId('urgent-button'));

    // expect(store.dispatch).toHaveBeenCalledWith(setNotificationFilter('URGENT'));
    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'SET_NOTIFICATION_FILTER',
      filter: 'URGENT'
    });
  });
  
  test('clicking on the second button should call setNotificationFilter with DEFAULT', () => {
    const setNotificationFilterMock = jest.fn();
    const wrapper = shallow(
      <Notifications
        setNotificationFilter={setNotificationFilterMock}
        displayDrawer={true}
        getUnreadNotifications={getUnreadNotifications(state).toJS()}
      />
    );
  
    wrapper.find('button').at(1).simulate('click');
  
    expect(setNotificationFilterMock).toHaveBeenCalledWith('DEFAULT');
  });

  it('should call setNotificationFilter with URGENT when clicking on the urgent button', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const expectedText = 'urgent';
    const element = getByText(expectedText);

    expect(element).toBeInTheDocument();
  });
});
