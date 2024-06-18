import React from 'react';

// Define the default user object
export const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false,
};
export const defaultLogOut = () => {};

// Create the AppContext
export const AppContext = React.createContext({
  user: defaultUser,
  logOut: () => {},
});