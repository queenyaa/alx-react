import React from 'react';
import { render, screen } from '@testing-library/react';
import NotificationItem from './NotificationItem';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';

describe('NotificationItem', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    render(<NotificationItem />);
  });

  it('renders correct HTML with type and value props', () => {
    render(<NotificationItem type="default" value="test" />);
    const notificationItem = screen.getByText('test');
    expect(notificationItem).toBeInTheDocument();
    expect(notificationItem).toHaveAttribute(
      'data-notification-type',
      'default'
    );
  });

  it('renders correct HTML with html prop', () => {
    const html = { __html: '<u>test</u>' };
    const wrapper = shallow(<NotificationItem html={html} />);
    const notificationItem = wrapper.find('[data-notification-type]');
    
    expect(notificationItem.exists()).toBe(true);
    expect(notificationItem.html()).toContain('<u>test</u>');
  });
});

describe('NotificationItem component', () => {
  it('calls markAsRead with the right ID argument when clicked', () => {
    const mockMarkAsRead = jest.fn();
    const wrapper = shallow(<NotificationItem id={1} markAsRead={mockMarkAsRead} />);
    wrapper.find('li').simulate('click');
    expect(mockMarkAsRead).toHaveBeenCalledWith(1);
  });
});