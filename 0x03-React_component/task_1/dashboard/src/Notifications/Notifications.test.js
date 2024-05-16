import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications component', () => {
  test('renders without crashing', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.exists()).toBeTruthy();
  });

  test('renders three list items', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.find('ul').children().length).toBe(3);
  });

  test('renders the text "Here is the list of notifications"', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.text()).toContain('Here is the list of notifications');
  });

  it('renders without crashing', () => {
    render(<Notifications />);
  });

  it('renders NotificationItem elements', () => {
    const { getAllByRole } = render(<Notifications />);
    const notificationItems = getAllByRole('listitem');
    expect(notificationItems.length).toBe(3); // Assuming there are three NotificationItem elements
  });

  it('renders first NotificationItem with correct HTML', () => {
    const { getByText } = render(<Notifications />);
    const firstNotificationItem = getByText('New course available');
    expect(firstNotificationItem).toBeInTheDocument();
  });

  it('renders the menu item and Notifications when displayDrawer is true', () => {
    const { getByText } = render(<Notifications displayDrawer={true} />);
    const menuItem = getByText('Your notifications');
    const notifications = getByText('Here is the list of notifications');
    expect(menuItem).toBeInTheDocument();
    expect(notifications).toBeInTheDocument();
  });

  it('does not render the menu item and Notifications when displayDrawer is false', () => {
    const { queryByText } = render(<Notifications displayDrawer={false} />);
    const menuItem = queryByText('Your notifications');
    const notifications = queryByText('Here is the list of notifications');
    expect(menuItem).not.toBeInTheDocument();
    expect(notifications).not.toBeInTheDocument();
  });

  it('renders correctly with an empty listNotifications array', () => {
    const { getByText } = render(<Notifications listNotifications={[]} />);
    expect(getByText('No new notification for now')).toBeInTheDocument();
  });

  it('renders correctly when listNotifications is not provided', () => {
    const { getByText } = render(<Notifications />);
    expect(getByText('No new notification for now')).toBeInTheDocument();
  });

  it('renders listNotifications correctly', () => {
    const listNotifications = [
      { id: 1, html: { __html: '<u>New course available</u>' }, type: 'default', value: 'New course available' },
      { id: 2, html: { __html: '<u>New resume available</u>' }, type: 'urgent', value: 'New resume available' },
    ];
    const { getByText } = render(<Notifications listNotifications={listNotifications} />);
    listNotifications.forEach(notification => {
      expect(getByText(notification.value)).toBeInTheDocument();
    });
  });

  it('does not display the default message when listNotifications is provided', () => {
    const listNotifications = [
      { id: 1, html: { __html: '<u>New course available</u>' }, type: 'default', value: 'New course available' },
      { id: 2, html: { __html: '<u>New resume available</u>' }, type: 'urgent', value: 'New resume available' },
    ];
    const { queryByText } = render(<Notifications listNotifications={listNotifications} />);
    expect(queryByText('Here is the list of notifications')).not.toBeInTheDocument();
  });
});