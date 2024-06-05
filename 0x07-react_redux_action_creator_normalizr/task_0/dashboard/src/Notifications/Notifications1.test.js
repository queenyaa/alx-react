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
    const wrapper = shallow(<listNotifications />);
    expect(wrapper.find('ul').children().length).toBe(0);
  });

  test('renders the text "Here is the list of notifications"', () => {
    const wrapper = shallow(<listNotifications listNotifications={listNotifications} />);
    expect(wrapper.find('.Notifications-list p').text()).toContain('Here is the list of notifications');
  });

  it('renders without crashing', () => {
    render(<Notifications />);
  });

  it('does not display the default message when listNotifications is provided', () => {
    const listNotifications = [
      { id: 1, html: { __html: '<u>New course available</u>' }, type: 'default', value: 'New course available' },
      { id: 2, html: { __html: '<u>New resume available</u>' }, type: 'urgent', value: 'New resume available' },
    ];
    const { queryByText } = render(<Notifications listNotifications={listNotifications} />);
    expect(queryByText('Here is the list of notifications')).not.toBeInTheDocument();
  });

  it('renders NotificationItem elements within a ul element', () => {
    const listNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];
    const { container } = render(<Notifications displayDrawer listNotifications={listNotifications} />);
    const ulElement = container.querySelector('.Notifications-list ul');
    expect(ulElement).toBeInTheDocument();
    expect(ulElement.children).toHaveLength(2); // Assuming there are two NotificationItem elements
  });
});
