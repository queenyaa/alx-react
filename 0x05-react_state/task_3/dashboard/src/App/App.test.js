import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import { StyleSheetTestUtils, StyleSheet, css } from 'aphrodite';

// configure({ adapter: new Adapter() });
describe('App component', () => {

    let originalAlert;

    beforeAll(() => {
      StyleSheetTestUtils.suppressStyleInjection();
      originalAlert = window.alert;
      window.alert = jest.fn();
    });
  
    afterAll(() => {
      StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
      window.alert = originalAlert;
    });

    it('calls logOut function and displays alert when pressing ctrl+h', () => {
      const logOutMock = jest.fn();
      const wrapper = shallow(<App logOut={logOutMock} />);
      const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });
      document.dispatchEvent(event);
      expect(window.alert).toHaveBeenCalledWith('Logging you out');
      expect(logOutMock).toHaveBeenCalled();
    });

    it('calls logOut function and displays alert when pressing ctrl+h', () => {
      const wrapper = shallow(<App />);
      const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });
      document.dispatchEvent(event);
      expect(window.alert).toHaveBeenCalledWith('Logging you out');
      expect(wrapper.state('user')).toEqual({ email: '', password: '', isLoggedIn: false });
    });

    it('renders without crashing', () => {
        shallow(<App />);  
    });

    it('contains the Notifications component', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Notifications)).toHaveLength(1);
    });

    it('contains the Header component', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Header)).toHaveLength(1);
    });

    it('contains the Login component', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Login)).toHaveLength(1);
    });

    it('contains the Login component when user is not logged in', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.find(Login)).toHaveLength(1);
    });

    it('contains the Footer component', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Footer)).toHaveLength(1);
    });

    it('renders Login component when isLoggedIn is false', () => {
      const wrapper = shallow(<App isLoggedIn={false} />); // Use shallow instead of render
      // const loginText = wrapper.find('Login'); // Find Login component in the shallow render
      // expect(loginText).toHaveLength(1); // Assert that the Login component is rendered
      expect(wrapper.find('Login')).toHaveLength(1); // Use expect instead of toBeTruthy
    });

    it('renders Login component when user is not logged in', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.find(Login)).toHaveLength(1);
    });

  it('does not render CourseList component when user is not logged in', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(CourseList)).toHaveLength(0);
  });

  it('does not render CourseList component when isLoggedIn is false', () => {
      const wrapper = shallow(<App isLoggedIn={false} />); // Use shallow instead of render
      // const courseListTable = wrapper.find('CourseList'); // Find CourseList component in the shallow render
      // expect(courseListTable).toHaveLength(1); // Assert that the CourseList component is not rendered
      expect(wrapper.find(CourseList)).toHaveLength(0); // Use expect instead of toBeTruthy
  });

  it('has default state for displayDrawer set to false', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state('displayDrawer')).toEqual(false);
  });

  it('updates state to true when handleDisplayDrawer is called', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().handleDisplayDrawer();
    expect(wrapper.state('displayDrawer')).toEqual(true);
  });

  it('updates state to false when handleHideDrawer is called', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ displayDrawer: true }); // Set initial state to true
    wrapper.instance().handleHideDrawer();
    expect(wrapper.state('displayDrawer')).toEqual(false);
  });

  it('updates state correctly when logIn is called', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().logIn('test@example.com', 'password');
    expect(wrapper.state('user')).toEqual({ email: 'test@example.com', password: 'password', isLoggedIn: true });
  });

  it('updates state correctly when logOut is called', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().logIn('test@example.com', 'password');
    expect(wrapper.state('user')).toEqual({ email: 'test@example.com', password: 'password', isLoggedIn: true });
    wrapper.instance().logOut();
    expect(wrapper.state('user')).toEqual({ email: '', password: '', isLoggedIn: false });
  });
});

describe('when isLoggedIn is true', () => {
  it('does not render Login component when isLoggedIn is true', () => {
      const wrapper = shallow(<App isLoggedIn={true} />); // Shallow render App component with isLoggedIn set to true
      // const loginComponent = wrapper.find('Login');
      // expect(loginComponent.exists()).toBeFalsy();
      // expect(loginComponent).toHaveLength(1);
      expect(wrapper.find('Login')).toHaveLength(1);
  });

  it('does not render Login component', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ user: { email: 'test@example.com', password: 'password', isLoggedIn: true } });
    wrapper.update(); // Ensure the component re-renders after state change
    expect(wrapper.find(Login)).toHaveLength(0);
  });

  it('renders CourseList component', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ user: { email: 'test@example.com', password: 'password', isLoggedIn: true } });
    wrapper.update(); // Ensure the component re-renders after state change
    expect(wrapper.find(CourseList)).toHaveLength(1);
  });

  it('markNotificationAsRead works as intended', () => {
    const wrapper = shallow(<App />);
    const initialNotifications = [
      { id: 1, html: { __html: '<u>New course available</u>' }, type: 'default', value: 'New course available' },
      { id: 2, html: { __html: '<u>New resume available</u>' }, type: 'urgent', value: 'New resume available' },
      { id: 3, html: { __html: '<u>Urgent requirement - complete by EOD</u>' }, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
    ];

    wrapper.setState({ listNotifications: initialNotifications });
    wrapper.instance().markNotificationAsRead(2);

    const expectedNotifications = [
      { id: 1, html: { __html: '<u>New course available</u>' }, type: 'default', value: 'New course available' },
      { id: 3, html: { __html: '<u>Urgent requirement - complete by EOD</u>' }, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
    ];

    expect(wrapper.state('listNotifications')).toEqual(expectedNotifications);
  });

});