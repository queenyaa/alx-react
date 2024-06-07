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
  
  const fetch = require('node-fetch');
  
  // Action creators
  export const login = (email, password) => ({
    type: LOGIN,
    user: { email, password }
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
      return fetch('/dist/login-success.json')
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            dispatch(loginSuccess());
          } else {
            dispatch(loginFailure());
          }
        })
        .catch(() => {
          dispatch(loginFailure());
        });
    };
  };
  
  // Optionally, you can bind action creators to the store
  export const boundLoginRequest = (email, password) => store.dispatch(loginRequest(email, password));