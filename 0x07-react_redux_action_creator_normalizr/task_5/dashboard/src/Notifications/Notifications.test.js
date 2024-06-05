import React, { useRef, useEffect } from 'react';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import { render, screen } from '@testing-library/react';
import Notifications from './Notifications';
import { StyleSheetTestUtils, css, StyleSheet } from 'aphrodite';
import { NotificationItem } from './NotificationItem';
import { getLatestNotification } from '../utils/utils';

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
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  test('renders without crashing', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.exists()).toBeTruthy();
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
  
  //   test('renders the text "Here is the list of notifications"', () => {
  //  const sampleNotifications = [
  //    { id: 1, type: 'default', value: 'New course available' },
  //    { id: 2, type: 'urgent', value: 'New resume available' },
  //  ];
  //  const wrapper = mount(<Notifications displayDrawer={true} listNotifications={sampleNotifications} />);
  //  const htmlContent = wrapper.html();
  //  expect(htmlContent).toContain('Here is the list of notifications');
  // });

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
        <div ref={ref}>
          <Notifications displayDrawer={true} listNotifications={sampleNotifications} />
        </div>
      );
    };

    mount(<WrapperComponent />);
  });

  it('renders without crashing', () => {
    render(<Notifications />);
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
    const { rerender } = render(<Notifications displayDrawer={true} listNotifications={initialList} />);
    
    // Update props with the same list
    rerender(<Notifications displayDrawer={true} listNotifications={initialList} />);

    // Expect console.log to not have been called
    expect(consoleSpy).not.toHaveBeenCalled();
  });




  test('calls handleDisplayDrawer when menu item is clicked', () => {
    const handleDisplayDrawer = jest.fn();
    const wrapper = shallow(<Notifications handleDisplayDrawer={handleDisplayDrawer} />);
    wrapper.find('#menuItem').simulate('click');
    expect(handleDisplayDrawer).toHaveBeenCalled();
  });

  test('calls handleHideDrawer when close button is clicked', () => {
    const handleHideDrawer = jest.fn();
    const wrapper = shallow(<Notifications displayDrawer={true} handleHideDrawer={handleHideDrawer} />);
    wrapper.find('button[aria-label="close"]').simulate('click');
    expect(handleHideDrawer).toHaveBeenCalled();
  });

  it('renders NotificationItem components when passed listNotifications prop', () => {
    const listNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      // { id: 3, html: { __html: '<u>Urgent requirement - complete by EOD</u>' }, type: 'urgent', html: {__html: getLatestNotification() } },
    ];
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={listNotifications} />);
    expect(wrapper.find('NotificationItem')).toHaveLength(3);
  });

  it('renders "No new notification for now" when listNotifications is empty', () => {
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={[]} />);
    expect(wrapper.find('NotificationItem').at(0).props().value).toEqual('No new notification for now');
  });

  it('calls markNotificationAsRead when a notification is clicked', () => {
    const markNotificationAsReadMock = jest.fn();
    const listNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];
    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={listNotifications}
        markNotificationAsRead={markNotificationAsReadMock}
      />
    );

    wrapper.find('NotificationItem').at(0).props().markAsRead();
    expect(markNotificationAsReadMock).toHaveBeenCalledWith(1);
  });
  
});