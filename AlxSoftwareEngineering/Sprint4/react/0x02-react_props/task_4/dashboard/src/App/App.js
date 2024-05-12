/* eslint-disable jsx-a11y/alt-text */
import './App.css';
import React from 'react';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import NotificationItem from '../Notifications/NotificationItem';
import CourseList from '../CourseList/CourseList';
import PropTypes from 'prop-types';

function App() {
  const handleClick = (event) => {
    const inputId = event.target.getAttribute('for');
    if (inputId) {
      document.getElementById(inputId).focus();
    }
  };

  return (
    <div className="App">
      {/* Other content */}
      <Notifications />
      <NotificationItem />
      <Header />
      <div className="App-body">
        <Login />
      </div>
      <Footer />
    </div>
  );
}

function App({ isLoggedIn }) {
  return isLoggedIn ? <CourseList /> : <Login />;
}

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default App;