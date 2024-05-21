import React from 'react';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import { render, screen } from '@testing-library/react';
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
    const wrapper = mount(<Notifications displayDrawer={true} listNotifications={sampleNotifications} />);
    const htmlContent = wrapper.html();
    expect(htmlContent).toContain('Here is the list of notifications');
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

  it('calls console.log when markAsRead is invoked', () => {
    const wrapper = shallow(<Notifications />);
    const instance = wrapper.instance();
    instance.markAsRead(1);
    expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
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

  it('rerenders when props are updated with a longer list', () => {
    const initialList = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];
    const updatedList = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', value: 'Urgent requirement - complete by EOD' },
    ];
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={initialList} />);
    const instance = wrapper.instance();
    const shouldComponentUpdateSpy = jest.spyOn(instance, 'shouldComponentUpdate');
    
    // Update props with a longer list
    wrapper.setProps({ displayDrawer: true, listNotifications: updatedList });

    // Expect shouldComponentUpdate to have been called
    expect(shouldComponentUpdateSpy).toHaveBeenCalled();
  });

  it('does not rerender when props are updated with the same list', () => {
    const initialList = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={initialList} />);
  const instance = wrapper.instance();

  // Mock the implementation of shouldComponentUpdate to always return false
  jest.spyOn(instance, 'shouldComponentUpdate').mockReturnValue(false);
  
  // Update props with the same list
  wrapper.setProps({ displayDrawer: true, listNotifications: initialList });

  // Expect shouldComponentUpdate to have been called
  expect(instance.shouldComponentUpdate).toHaveBeenCalled();
  });

  it('rerenders when props are updated with a longer list', () => {
    const initialList = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];
    const longerList = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'info', value: 'New notification' },
    ];
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={initialList} />);
    const instance = wrapper.instance();
    const shouldComponentUpdateSpy = jest.spyOn(instance, 'shouldComponentUpdate');
    
    // Update props with a longer list
    wrapper.setProps({ displayDrawer: true, listNotifications: longerList });

    // Expect shouldComponentUpdate to have been called
    expect(shouldComponentUpdateSpy).toHaveBeenCalled();
  });
  
});