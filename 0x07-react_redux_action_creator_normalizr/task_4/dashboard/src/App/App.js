/* eslint-disable jsx-a11y/alt-text */
import { StyleSheet, css } from 'aphrodite';
import React, { Component, useState } from 'react';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import NotificationItem from '../Notifications/NotificationItem';
import CourseList from '../CourseList/CourseList';
import PropTypes from 'prop-types';
import { getLatestNotification } from '../utils/utils';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import { AppContext, defaultUser } from '../App/AppContext';


  // Sample course list
  const listCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 }
  ];

  const listNotifications = [
    { id: 1, html: { __html: '<u>New course available</u>' }, type: 'default', value: 'New course available' },
    { id: 2, html: { __html: '<u>New resume available</u>' }, type: 'urgent', value: 'New resume available' },
    { id: 3, html: { __html: '<u>Urgent requirement - complete by EOD</u>' }, type: 'urgent', html: {__html: getLatestNotification() } },
  ];

const styles = StyleSheet.create({
  app: {
    fontFamily: 'Arial, Helvetica, sans-serif',
  },

  body: {
    padding: '20px',
  },

  footer: {
    marginBottom: '0px',
    borderTop: '2px solid red',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: defaultUser,
      logOut: this.logOut,
      displayDrawer: false,
      listNotifications: listNotifications,
      listCourses
    };
      this.handleKeyDown = this.handleKeyDown.bind(this);
      this.handleDisplayDrawer = this.handleDisplayDrawer.bind(this);
      this.handleHideDrawer = this.handleHideDrawer.bind(this);
      this.logIn = this.logIn.bind(this);
      this.logOut = this.logOut.bind(this);
      this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
  }

  logIn(email, password) {
    this.setState({
      user: {
        email: email,
        password: password,
        isLoggedIn: true
      }
    });
  }

  logOut = () => {
    this.setState({ user: defaultUser });
  }

  markNotificationAsRead(id) {
    this.setState({
      listNotifications: this.state.listNotifications.filter(notification => notification.id !== id),
    });
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

  handleDisplayDrawer() {
    this.setState({ displayDrawer: true });
  }

  handleHideDrawer() {
    this.setState({ displayDrawer: false });
  }

  render () {
    const { user = { email: '', password: '', isLoggedIn: false}, displayDrawer, listNotifications, listCourses } = this.state;
    // const user = this.state.user || defaultUser;

    return (
      <>
        <AppContext.Provider value={{ user, logOut: this.logOut }}>
          <div className={css(styles.app)}>
            {/* Other content */}
            <Notifications
              displayDrawer={displayDrawer}
              listNotifications={listNotifications}
              handleDisplayDrawer={this.handleDisplayDrawer}
              handleHideDrawer={this.handleHideDrawer}
              markNotificationAsRead={() => this.markNotificationAsRead(id)}
              logOut={this.logOut}
            />
            <NotificationItem />
            <Header />
            {user.isLoggedIn ? (
              <BodySectionWithMarginBottom title="Course list">
              <CourseList listCourses={listCourses} />
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title="Log in to continue">
                <Login logIn={this.logIn} />
              </BodySectionWithMarginBottom>
            )}
            <div className={css(styles.body)}>
              <BodySection title="News from the School">
                <p>Text</p>
              </BodySection>
            </div>
            <Footer className={css(styles.footer)}/>
          </div>
        </AppContext.Provider>
      </>
    );
  }
}

App.defaultProps = {
  isLoggedIn: false,
  logOut: () => {},
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  logOut: PropTypes.func,
};

export default App;