/* eslint-disable jsx-a11y/alt-text */
import './App.css';
import React, { Component, useState } from 'react';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import NotificationItem from '../Notifications/NotificationItem';
import CourseList from '../CourseList/CourseList';
import PropTypes from 'prop-types';

  // Sample course list
  const listCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 }
  ];

  const listNotifications = [
    { id: 1, html: { __html: '<u>New course available</u>' }, type: 'default', value: 'New course available' },
    { id: 2, html: { __html: '<u>New resume available</u>' }, type: 'urgent', value: 'New resume available' },
    { id: 3, html: { __html: '<u>Urgent requirement - complete by EOD</u>' }, type: 'urgent', value: 'Urgent requirement - complete by EOD' }
  ];
class App extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.props.logOut();
    }
  }

  render () {
  const { isLoggedIn } = this.props;

    return (
      <>
        <div className="App">
          {/* Other content */}
          <Notifications displayDrawer={true} listNotifications={listNotifications} />
          <NotificationItem />
          <Header />
          <div className="App-body">
            <Login />
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

App.defaultProps = {
  isLoggedIn: false,
}

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
};

export default App;