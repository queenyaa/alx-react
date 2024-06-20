// NotificationsContainer.test.js
import React from 'react';
import { shallow } from 'enzyme';
import NotificationsContainer from './NotificationsContainer';

describe('NotificationsContainer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NotificationsContainer />);
  });

  it('fetches notifications on mount', () => {
    const fetchNotificationsMock = jest.fn();
    shallow(<NotificationsContainer fetchNotifications={fetchNotificationsMock} />);
    expect(fetchNotificationsMock).toHaveBeenCalled();
  });
});
