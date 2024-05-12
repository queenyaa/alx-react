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

  const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Sample course list
    const listCourses = [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 }
    ];

    const listNotifications = [
      { id: 1, html: { __html: '<u>New course available</u>' }, type: 'default', value: 'New course available' },
      { id: 2, html: { __html: '<u>New resume available</u>' }, type: 'urgent', value: 'New resume available' },
      { id: 3, html: { __html: '<u>Technical challenge</u>' }, type: 'urgent', value: 'Technical challenge' }
    ];

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