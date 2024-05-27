import React from 'react';

// Define the default user object
const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false,
};

// Define the default logOut function
const defaultLogOut = () => {};

// Create the context with the default values
const AppContext = React.createContext({
  user: defaultUser,
  logOut: defaultLogOut,
});

// Export the context and the default user object for reuse
export { AppContext, defaultUser, defaultLogOut };