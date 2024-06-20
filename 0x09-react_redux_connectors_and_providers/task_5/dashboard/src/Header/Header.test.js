import React from 'react';
import { shallow } from 'enzyme';
import { render, fireEvent } from '@testing-library/react';
import { Header } from './Header';
import ConnectedHeader from './Header';
import { StyleSheetTestUtils } from 'aphrodite';
import { AppContext } from './../App/AppContext';
import { Provider } from 'react-redux';
// import { initialState } from '../reducers/uiReducer';
import configureStore from 'redux-mock-store';

// Mock the image import
jest.mock('./../assets/holbertonlogo.jpg', () => ({
    // Return a placeholder value for the image import
    default: 'holbertonlogo.jpg',
  }));

function toBeInTheDocument(element) {

    if (element === null || element === undefined) {
      throw new Error(`Received ${element}`);
    }
    if (!element.parentElement) {
      throw new Error('Element must be attached to the document');
    }
  }

const mockStore = configureStore([]);
const defaultState = {
  isUserLoggedIn: false,
  user: {
    email: '',
    isLoggedIn: false,
  },
};

describe('Header component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  const defaultProps = {
    user: { email: '', isLoggedIn: false },
    logout: jest.fn(),
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<Header {...defaultProps} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('does not display the logout section when user is not logged in', () => {
    const wrapper = shallow(<Header {...defaultProps} />);
    expect(wrapper.find('#logoutSection').length).toBe(0);
  });

  it('displays the logout section when user is logged in', () => {
    const loggedInProps = { ...defaultProps, user: { email: 'test@test.com', isLoggedIn: true } };
    const wrapper = shallow(<Header {...loggedInProps} />);
    expect(wrapper.find('#logoutSection').length).toBe(1);
  });

  it('calls logout when the logout button is clicked', () => {
    const loggedInProps = { ...defaultProps, user: { email: 'test@test.com', isLoggedIn: true } };
    const wrapper = shallow(<Header {...loggedInProps} />);
    wrapper.find('#logoutSection button').simulate('click');
    expect(loggedInProps.logout).toHaveBeenCalled();
  });

    it('renders img and h1 tags', () => {
      const user = { isLoggedIn: true, email: 'test@example.com' };
      const wrapper = shallow(<Header user={user} />);
      expect(wrapper.find('img')).toHaveLength(1);
      expect(wrapper.find('h1')).toHaveLength(1);
    });

    it('does not render logout section with default context value', () => {
      const { queryByTestId } = render(<Header user={{ isLoggedIn: false, email: '' }} />);
      const logoutSection = queryByTestId('logoutSection');
      expect(logoutSection).toBeNull();
    });
});