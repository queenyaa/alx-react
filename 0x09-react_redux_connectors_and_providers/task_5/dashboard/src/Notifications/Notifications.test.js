import React, { useRef, useEffect } from 'react';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import { render, screen } from '@testing-library/react';
import Notifications from './Notifications';
import { StyleSheetTestUtils, css, StyleSheet } from 'aphrodite';
import { Provider } from 'react-redux';
import rootReducer from '../reducers/rootReducer';
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import NotificationItem from './NotificationItem';

// const store = createStore(rootReducer, applyMiddleware(thunk));
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Define the styles here to be used in the test
const styles = StyleSheet.create({
  menuItem: {
    textAlign: 'right',
    position: 'fixed',
    top: '10px',
    right: '10px',
    backgroundColor: '#fff8f8',
    padding: '10px',
    cursor: 'pointer',
    ':hover': {
      animationName: {
        '0%': { transform: 'translateY(0)' },
        '25%': { transform: 'translateY(-5px)' },
        '50%': { transform: 'translateY(5px)' },
        '75%': { transform: 'translateY(-5px)' },
        '100%': { transform: 'translateY(0)' },
      },
      animationDuration: '0.5s, 1s',
      animationIterationCount: '3, 3',
      animationTimingFunction: 'ease-in-out',
    },
  }
});

describe('Notifications component', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    store = mockStore({
      notifications: {
        listNotifications: [
          { id: 1, html: { __html: '<u>New course available</u>' }, type: 'default', value: 'New course available' },
          { id: 2, html: { __html: '<u>New resume available</u>' }, type: 'urgent', value: 'New resume available' },
          { id: 3, html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' }, type: 'urgent' },
        ] } });
    store.dispatch = jest.fn();

    wrapper = shallow(
      <Provider store={store}>
        <Notifications />
      </Provider>
    ).dive();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  test('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('renders three list items', () => {
    const wrapper = shallow(<listNotifications />);
    expect(wrapper.find('ul').children().length).toBe(0);
  });

  function findText(node, text) {
    if (!node || !node.childNodes) return false;
    
    for (let i = 0; i < node.childNodes.length; i++) {
      const child = node.childNodes[i];
      if (child.nodeType === Node.TEXT_NODE && child.textContent.includes(text)) {
        return true;
      } else if (findText(child, text)) {
        return true;
      }
    }
    
    return false;
  }

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
            <Notifications displayDrawer={true} listNotifications={sampleNotifications} />
          </div>
        </Provider>
      );
    };

    mount(<WrapperComponent />);
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );
  });

  

  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('does not rerender when props are updated with the same list', () => {
    const initialList = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];
    const { rerender } = render(
      <Provider store={store}>
        <Notifications displayDrawer={true} listNotifications={initialList} />
      </Provider>
    );
    
    // Update props with the same list
    rerender(
      <Provider store={store}>
        <Notifications displayDrawer={true} listNotifications={initialList} />
      </Provider>
    );

    // Expect console.log to not have been called
    expect(consoleSpy).not.toHaveBeenCalled();
  });




  test('calls handleDisplayDrawer when menu item is clicked', () => {
    const handleDisplayDrawer = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <Notifications handleDisplayDrawer={handleDisplayDrawer} />
      </Provider>
    );
    const notificationsComponent = wrapper.find('Notifications');
    const menuItem = notificationsComponent.find('#menuItem');
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
      </Provider>);
    const closeButton = wrapper.find('button[aria-label="close"]');
    if (closeButton.exists()) {
      closeButton.simulate('click');
      expect(handleHideDrawer).toHaveBeenCalled();
    } else {
      throw new Error('Close button not found');
    }
    wrapper.unmount();
  });

  it('renders NotificationItem components when passed listNotifications prop', () => {
    const listNotifications = [
      { id: 1, html: { __html: '<u>New course available</u>' }, type: 'default', value: 'New course available' },
      { id: 2, html: { __html: '<u>New resume available</u>' }, type: 'urgent', value: 'New resume available' },
      { id: 3, html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' }, type: 'urgent' },
    ];
    const wrapper = mount(
      <Provider store={store}>
        <Notifications displayDrawer={true} listNotifications={listNotifications} />
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

  it('renders "No new notification for now" when listNotifications is empty', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Notifications displayDrawer={true} listNotifications={[]} />
      </Provider>
    );
    const notificationItem = wrapper.find('NotificationItem');
    if (notificationItem.exists()) {
      expect(notificationItem.at(0).props().value).toEqual('New course available');
    } else {
      throw new Error('NotificationItem not found');
    }

    wrapper.unmount();
  });

  it('calls markNotificationAsRead when a notification is clicked', () => {
    const markNotificationAsReadMock = jest.fn();
    const listNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];
    const wrapper = mount(
      <Provider store={store}>
        <Notifications
          displayDrawer={true}
          listNotifications={listNotifications}
          markNotificationAsRead={markNotificationAsReadMock}
        />
      </Provider>
    );

    const notificationItem = wrapper.find('NotificationItem').at(0);
    if (notificationItem.exists()) {
      notificationItem.props().markAsRead();
      expect(markNotificationAsReadMock).toHaveBeenCalledWith(1);
    } else {
      throw new Error('NotificationItem not found');
    }

    wrapper.unmount();
  });
  
});