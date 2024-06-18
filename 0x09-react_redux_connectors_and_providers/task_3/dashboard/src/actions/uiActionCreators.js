import {
    LOGIN,
    LOGOUT,
    DISPLAY_NOTIFICATION_DRAWER,
    HIDE_NOTIFICATION_DRAWER,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
  } from './uiActionTypes';
  import 'node-fetch';
  import axios from 'axios';
  import loginSuccessData from '../../dist/login-success.json';
  
  const fetch = require('node-fetch');

  const defaultCredentials = {
    email: 'default@example.com',
    password: 'dpassword',
  }
  
  // Action creators
  export const login = (email, password) => ({
    type: LOGIN,
    user: { email, isLoggedIn: true },
  });
  
  export const logout = () => ({
    type: LOGOUT
  });
  
  export const displayNotificationDrawer = () => ({
    type: DISPLAY_NOTIFICATION_DRAWER
  });
  
  export const hideNotificationDrawer = () => ({
    type: HIDE_NOTIFICATION_DRAWER
  });
  
  export const loginSuccess = () => ({
    type: LOGIN_SUCCESS
  });
  
  export const loginFailure = () => ({
    type: LOGIN_FAILURE
  });
  
  // Bound action creators
  export const boundLogin = (email, password) => (dispatch) => dispatch(login(email, password));
  
  export const boundLogout = () => (dispatch) => dispatch(logout());
  
  export const boundDisplayNotificationDrawer = () => (dispatch) => dispatch(displayNotificationDrawer());
  
  export const boundHideNotificationDrawer = () => (dispatch) => dispatch(hideNotificationDrawer());
  
  // Async action creator for login
  export const loginRequest = (email, password) => {
    return (dispatch) => {
      dispatch(login(email, password));
        // const user = loginSuccessData.find((notification) => notification.author.email === email);
        // if (user && (predefinedCredentials[email] === password || (email === defaultCredentials.email && password === defaultCredentials.password))) {
        if (email === loginSuccessData.email || (email === defaultCredentials.email && password === defaultCredentials.password)) {
          dispatch(loginSuccess(loginSuccessData));
        } else {
          dispatch(loginFailure());
        }
    };
  };
  
  // Optionally, you can bind action creators to the store
  export const boundLoginRequest = (email, password) => (dispatch) => dispatch(loginRequest(email, password));