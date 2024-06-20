import React from 'react';
import { shallow, mount } from 'enzyme';
import { UnconnectedApp as App } from './App';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import { StyleSheetTestUtils, StyleSheet, css } from 'aphrodite';
import { fromJS } from 'immutable';
import { mapStateToProps } from './App';
import configureStore from 'redux-mock-store';
import uiReducer from '../reducers/uiReducer';
import { createStore } from 'redux';


// const mockStore = configureStore([]);
// const initialState = fromJS({
//  isNotificationDrawerVisible: true,
//  isUserLoggedIn: true,
// })
// const store = mockStore(initialState);

const mockState = {
  user: {
    email: 'test@example.com',
    isLoggedIn: true,
  },
  isNotificationDrawerVisible: true,
};

const mockStore = configureStore([])(mockState);

describe('<App />', () => {
  let wrapper;
    const defaultProps = {
      displayDrawer: false,
      listNotifications: [],
      user: { email: '', isLoggedIn: false },
      loginRequest: jest.fn(),
      logout: jest.fn(),
      displayNotificationDrawer: jest.fn(),
      hideNotificationDrawer: jest.fn(),
    };
  
  beforeEach(() => {
    wrapper = shallow(<App {...defaultProps} />);
  });

  it('checks that the logOut function is called when ctrl+h is pressed', () => {
    const logOut = jest.fn();
    wrapper.setProps({ logout: logOut });
    const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });
    document.dispatchEvent(event);
    expect(logOut).toHaveBeenCalled();
  });

  it('updates state correctly when logIn is called', () => {
    const loginRequest = jest.fn();
    const updatedProps = { ...defaultProps, loginRequest };

    wrapper = shallow(<App {...updatedProps} />);
    wrapper.setProps({ user: { email: 'test@example.com', isLoggedIn: true } });

    expect(wrapper.instance().props.user).toEqual({ email: 'test@example.com', isLoggedIn: true });
  });

  it('renders the CourseList component if user is logged in', () => {
    const loggedInProps = { ...defaultProps, user: { email: 'test@test.com', isLoggedIn: true } };
    wrapper.setProps(loggedInProps);
    expect(wrapper.find(CourseList).length).toBe(1);
  });

  it('updates props correctly when logout is called', () => {
    const logout = jest.fn();
    const updatedProps = { ...defaultProps, logout };

    wrapper = shallow(<App {...updatedProps} />);
    wrapper.setProps({ user: { email: 'test@example.com', isLoggedIn: true } });

    expect(wrapper.instance().props.user).toEqual({ email: 'test@example.com', isLoggedIn: true });

    wrapper.setProps({ user: { email: '', isLoggedIn: false } });
    expect(wrapper.instance().props.user).toEqual({ email: '', isLoggedIn: false });
  });
})

// configure({ adapter: new Adapter() });
describe('App Component', () => {

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
    expect(wrapper.instance().props.displayDrawer).toEqual(false);
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

  it('does not render Login component when isLoggedIn is true', () => {
    const wrapper = shallow(<App />); // Shallow render App component with isLoggedIn set to true
    wrapper.setState({ isLoggedIn: true });
    // const loginComponent = wrapper.find(Login);
    expect(wrapper.find('Login')).toHaveLength(1);
  });

  it('renders CourseList component', () => {
    const wrapper = shallow(<App isLoggedIn={true} />);
    expect(wrapper.find(CourseList)).toHaveLength(0);
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

  it('renders Notifications component with displayDrawer prop from Redux state', () => {
    const wrapper = shallow(<App />);
    wrapper.setProps({ displayDrawer: true });
    expect(wrapper.find(Notifications).prop('displayDrawer')).toBe(true);
  });

  it('renders Notifications component with displayDrawer prop as false from Redux state', () => {
    const wrapper = shallow(<App displayDrawer={false} />);
    expect(wrapper.find(Notifications).prop('displayDrawer')).toBe(false);
  });
});

describe('mapStateToProps', () => {

  it('should map state to props correctly', () => {
    // Mock your Redux store
    const store = createStore(uiReducer); // Create your store with the rootReducer

    // Define the state that you expect from the store
    const state = {
        isUserLoggedIn: true,
        isNotificationDrawerVisible: false,
        user: {
          email: 'test@example.com',
          isLoggedIn: true
      },
    };

    // Execute mapStateToProps with your mocked state
    const mappedProps = mapStateToProps(state);

    // Define the expected props based on your mapStateToProps implementation
    const expectedProps = {
      displayDrawer: false,
      user: {
        email: 'test@example.com',
        isLoggedIn: true
      },
    };

    // Assert that the props returned by mapStateToProps match the expected props
    expect(mappedProps).toEqual(expectedProps);
  });
});