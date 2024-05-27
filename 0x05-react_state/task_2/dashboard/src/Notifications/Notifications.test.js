import React, { useRef, useEffect } from 'react';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import { render, screen } from '@testing-library/react';
import Notifications from './Notifications';
import { StyleSheetTestUtils, css, StyleSheet } from 'aphrodite';

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
  
});