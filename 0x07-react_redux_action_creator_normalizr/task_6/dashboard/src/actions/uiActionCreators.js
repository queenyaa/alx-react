import {
    LOGIN,
    LOGOUT,
    DISPLAY_NOTIFICATION_DRAWER,
    HIDE_NOTIFICATION_DRAWER
  } from './uiActionTypes';
  
  // Action creator for login
  export const login = (email, password) => {
    return {
      type: LOGIN,
      user: { email, password }
    };
  };

  export const boundLogin = (email, password) => (dispatch) => dispatch(login(email, password));

  
  // Action creator for logout
  export const logout = () => {
    return {
      type: LOGOUT
    };
  };

  export const boundLogout = () => (dispatch) => dispatch(logout());
  
  // Action creator for displaying the notification drawer
  export const displayNotificationDrawer = () => {
    return {
      type: DISPLAY_NOTIFICATION_DRAWER
    };
  };

  export const boundDisplayNotificationDrawer = () => (dispatch) => dispatch(displayNotificationDrawer());
  
  // Action creator for hiding the notification drawer
  export const hideNotificationDrawer = () => {
    return {
      type: HIDE_NOTIFICATION_DRAWER
    };
  }

  export const boundHideNotificationDrawer = () => (dispatch) => dispatch(hideNotificationDrawer())