import React from 'react';
import { render } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem', () => {
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
    render(<NotificationItem html={html} />);
    const notificationItem = screen.getByText('test');
    expect(notificationItem).toBeInTheDocument();
    expect(notificationItem).toHaveAttribute('data-notification-type');
    expect(notificationItem.innerHTML).toContain('<u>test</u>');
  });
});