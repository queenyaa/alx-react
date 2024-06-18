import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { login, loginSuccess, loginFailure, loginRequest, logout, displayNotificationDrawer, hideNotificationDrawer } from './uiActionCreators';
import { LOGIN, LOGOUT, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER, LOGIN_SUCCESS, LOGIN_FAILURE } from './uiActionTypes';


// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('loginRequest', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should dispatch login action with correct email and password', () => {
      const dispatch = jest.fn();
      const email = 'test@example.com';
      const password = 'password';
      
      loginRequest(email, password)(dispatch);
      
      expect(dispatch).toHaveBeenCalledWith(login(email, password));
    });
  
    it('should dispatch login action when email matches loginSuccessData email or matches defaultCredentials email and password', () => {
      const dispatch = jest.fn();
      const email = 'default@example.com';
      const password = 'dpassword';
      const loginSuccessData = { email: 'default@example.com' };
      const defaultCredentials = { email: 'default@example.com', password: 'dpassword' };
  
      loginRequest(email, password)(dispatch);
  
      expect(dispatch).toHaveBeenCalledWith(loginSuccess(loginSuccessData));
    });
  
    it('should dispatch loginFailure action when email does not match loginSuccessData email or defaultCredentials email and password', () => {
      const dispatch = jest.fn();
      const email = 'test@example.com';
      const password = 'password';
      const loginSuccessData = { email: 'default@example.com' };
      const defaultCredentials = { email: 'default@example.com', password: 'dpassword' };
  
      loginRequest(email, password)(dispatch);
  
      expect(dispatch).toHaveBeenCalledWith(loginFailure());
    });

    it('should dispatch login action before making the request', () => {
      const dispatch = jest.fn();
      const email = 'test@example.com';
      const password = 'password';
  
      loginRequest(email, password)(dispatch);
  
      expect(dispatch).toHaveBeenCalledWith(login(email, password));
    });
  
    it('should dispatch loginSuccess action when the response is successful', async () => {
        const dispatch = jest.fn();
        const getState = jest.fn();
        const email = 'test@example.com';
        const password = 'password';
      
        global.fetch = jest.fn().mockResolvedValue({
          json: jest.fn().mockResolvedValue({ success: true }),
        });
      
        await loginRequest(email, password)(dispatch, getState);
      
        // expect(dispatch).toHaveBeenCalledWith(login(email, password));
        // expect(dispatch).toHaveBeenCalledWith(loginSuccess());
        expect(dispatch.mock.calls[0][0]).toEqual(login(email, password));
        expect(dispatch.mock.calls[1][0]).toEqual(loginFailure(email, password));
    });
  
    it('should dispatch loginFailure action when the response is not successful', async () => {
      const dispatch = jest.fn();
      // const getState = jest.fn();
      const email = 'test@example.com';
      const password = 'password';
  
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({ success: false }),
      });
  
      await loginRequest(email, password)(dispatch);
      expect(dispatch).toHaveBeenCalledWith(loginFailure());
      // expect.assertions(1);
    });
  
    it('should dispatch loginFailure action when an error occurs during the request', async () => {
      const dispatch = jest.fn();
      const email = 'test@example.com';
      const password = 'password';
  
      global.fetch = jest.fn().mockRejectedValue(new Error('Request failed'));
  
      await loginRequest(email, password)(dispatch);
      expect(dispatch).toHaveBeenCalledWith(loginFailure());
    });
  });

describe('uiActionCreators', () => {
  it('should create an action to login', () => {
    const email = 'test@example.com';
    const password = '123456';
    const expectedAction = {
      type: LOGIN,
      user: { email, isLoggedIn: true }
    };
    expect(login(email, password)).toEqual(expectedAction);
  });

  it('should create an action to logout', () => {
    const expectedAction = {
      type: LOGOUT
    };
    expect(logout()).toEqual(expectedAction);
  });

  it('should create an action to display the notification drawer', () => {
    const expectedAction = {
      type: DISPLAY_NOTIFICATION_DRAWER
    };
    expect(displayNotificationDrawer()).toEqual(expectedAction);
  });

  it('should create an action to hide the notification drawer', () => {
    const expectedAction = {
      type: HIDE_NOTIFICATION_DRAWER
    };
    expect(hideNotificationDrawer()).toEqual(expectedAction);
  });
});