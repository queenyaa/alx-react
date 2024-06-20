/* eslint-disable jsx-a11y/alt-text */
import { StyleSheet, css } from 'aphrodite';
import React, { Component, useState } from 'react';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import PropTypes from 'prop-types';
import { getLatestNotification } from '../utils/utils';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import { AppContext, defaultUser } from '../App/AppContext';
import { connect } from 'react-redux';
import { rootReducer } from '../reducers/rootReducer';
import { displayNotificationDrawer, hideNotificationDrawer, loginRequest, logout } from '../actions/uiActionCreators';


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
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      // user: defaultUser,
      // logout: this.logOut,
      // displayDrawer: false,
      listNotifications: listNotifications,
      listCourses
    };
      this.handleKeyDown = this.handleKeyDown.bind(this);
      // this.handleDisplayDrawer = this.handleDisplayDrawer.bind(this);
      // this.handleHideDrawer = this.handleHideDrawer.bind(this);
      // this.logIn = this.logIn.bind(this);
      // this.logOut = this.logOut.bind(this);
      this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
  }

  login(email, password) {
    this.setState({
      user: {
        email: email,
        password: password,
        isLoggedIn: true
      }
    });
  }

  logout = () => {
    this.setState({ user: defaultUser });
  }

  markNotificationAsRead(id) {
    this.setState({
      listNotifications: this.state.listNotifications.filter(notification => notification.id !== id),
    });
  }

  componentDidMount() {
    const { displayNotificationDrawer, hideNotificationDrawer } = this.props;
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.props.logout();
    }
  }

  // handleDisplayDrawer() {
  //  this.setState({ displayDrawer: true });
  // }

  // handleHideDrawer() {
  //  this.setState({ displayDrawer: false });
  // }

  render () {
    const { displayDrawer, user, logout, displayNotificationDrawer, hideNotificationDrawer } = this.props;
    // const user = this.state.user || defaultUser;
    const { listNotifications, listCourses } = this.state;

    return (
      <React.Fragment>
        <AppContext.Provider value={{ user, logOut: logout }}>
          <div className={css(styles.app)}>
            {/* Other content */}
            <Notifications
              displayDrawer={displayDrawer}
              listNotifications={listNotifications}
              handleDisplayDrawer={this.handleDisplayDrawer}
              handleHideDrawer={this.handleHideDrawer}
              markNotificationAsRead={this.markNotificationAsRead}
              logOut={logout}
            />
            <Header />
            {user.isLoggedIn ? (
              <BodySectionWithMarginBottom title="Course list">
                <CourseList listCourses={listCourses} />
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title="Log in to continue">
                <Login logIn={loginRequest} />
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
      </React.Fragment>
    );
  }
}

App.defaultProps = {
  // isLoggedIn: false,
  listNotifications: [],
  // listCourses: [],
  displayDrawer: false,
  user: { isLoggedIn: false, email: '' },
  // hideNotificationDrawer: () => {},
  // displayNotificationDrawer: () => {},
  // loginRequest: () => {},
  // logout: () => {},
}

App.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    isLoggedIn: PropTypes.bool,
  }).isRequired,
  loginRequest: PropTypes.func,
  logout: PropTypes.func,
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.array,
  displayNotificationDrawer: PropTypes.func,
  hideNotificationDrawer: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.ui.user ? state.ui.user.isUserLoggedIn : false,
  displayDrawer: state.ui.isNotificationDrawerVisible,
  user: state.ui.user ? { ...state.ui.user } : { email: '', isLoggedIn: false },
});

export { mapStateToProps };

const mapDispatchToProps = {
  loginRequest,
  logout,
  displayNotificationDrawer,
  hideNotificationDrawer
}

export { App as UnconnectedApp };

// const ConnectedApp = connect(mapStateToProps)(App);

export default connect(mapStateToProps, mapDispatchToProps)(App);