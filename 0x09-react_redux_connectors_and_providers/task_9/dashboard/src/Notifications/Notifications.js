import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import closeIcon from './../assets/closeicon.png';
import NotificationItem from './NotificationItem';
import { getLatestNotification } from '../utils/utils';
import { getUnreadNotifications } from '../selectors/notificationSelector';
import { fetchNotifications, markAsRead, setNotificationFilter } from '../actions/notificationActionCreators';
import { connect } from 'react-redux';
import { thunk } from 'redux-thunk';
import { notifications } from '../reducers/notificationReducer';

const bounceKeyframes = {
  '0%': {
    transform: 'translateY(0)',
  },
  '25%': {
    transform: 'translateY(-5px)',
  },
  '50%': {
    transform: 'translateY(5px)',
  },
  '75%': {
    transform: 'translateY(-5px)',
  },
  '100%': {
    transform: 'translateY(0)',
  },
};

const opacityKeyframes = {
  '0%': {
    opacity: 0.5,
  },
  '100%': {
    opacity: 1,
  },
};

const styles = StyleSheet.create({
  menuItem: {
    textAlign: 'right',
    position: 'fixed',
    top: '10px',
    right: '10px',
    backgroundColor: '#fff8f8',
    padding: '10px',
    cursor: 'pointer',
    ':hover': {
      animationName: [bounceKeyframes, opacityKeyframes],
      animationDuration: '0.5s, 1s',
      animationIterationCount: '3, 3',
      animationTimingFunction: 'ease-in-out',
    },
  },
  notifications: {
    display: 'block',
    border: '1px dashed red',
    position: 'fixed',
    top: '0',
    right: '0',
    width: '300px',
    height: '10vh',
    boxShadow: '-2px 0px 5px rgba(0, 0, 0, 0.5)',
    padding: '30px',
    fontSize: 'small',
    marginTop: '40px',
  },
  urgentButton: {
    background: 'transparent',
    border: 'none',
    fontSize: '24px',
    color: 'red',  // Set the color to red
    cursor: 'pointer',
    marginRight: '10px',  // Adjust margins as needed
  },
  notificationsList: {
    ul: {
      listStyleType: 'disc',
      padding: '0',
      paddingLeft: '20px',
      margin: '0',
    },
    li: {
      padding: '6px 0',
      ':last-child': {
        borderBottom: 'none',
      },
    },
    p: {
      marginTop: '5px',
    },
    '[data-notification-type="default"]': {
      color: 'blue',
      marginBottom: '5px',
    },
    '[data-notification-type="urgent"]': {
      color: 'red',
      ':last-child': {
        color: 'red',
        fontWeight: 'bold',
        '::first-line': {
          fontWeight: 'normal',
        },
      },
    },
  },
  hidden: {
    display: 'none',
  },
});

class Notifications extends PureComponent {
  // markAsRead(id) {
    // console.log(`Notification ${id} has been marked as read`);
  // }

  componentDidMount() {
    this.props.fetchNotifications();
  }

  handleSetNotificationFilter = (filter) => {
    this.props.setNotificationFilter(filter);
  };

  constructor(props) {
    super(props);
    this.state = { hasError: false};
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  render() {
    const { displayDrawer, getUnreadNotifications, handleDisplayDrawer, handleHideDrawer, markAsRead } = this.props;

    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return (
      <>
        <div className={css(styles.menuItem)} id="menuItem" onClick={handleDisplayDrawer}>
          <p>Your notifications</p>
        </div>
        {displayDrawer && (
          <div className={css(styles.notifications)}>
            <button
              style={{
                background: 'transparent',
                border: 'none',
                position: 'absolute',
                right: 5,
                top: 5,
              }}
              aria-label="close"
              onClick={ handleHideDrawer }
            >
              <img src={closeIcon} alt="close-icon" height="10" width="10" />
            </button>
            <div className={css(styles.notificationsList)}>
              <p>Here is the list of notifications</p>
              <button 
                className={css(styles.urgentButton)}
                onClick={() => setNotificationFilter('URGENT')}
                data-testid="urgent-button"
                aria-label="urgent">{'❗❗'}</button> 
              <button
                className={css(styles.urgentButton)}
                onClick={() => setNotificationFilter('DEFAULT')}
                data-testid="default-button"
                aria-label="default">💠</button>
              <ul>
                {getUnreadNotifications && getUnreadNotifications.length === 0 && (
                  <NotificationItem value="No new notification for now" />
                )}
                {Array.isArray(getUnreadNotifications) && getUnreadNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    id={notification.id}
                    type={notification.type}
                    value={notification.value}
                    html={notification.html}
                    data-priority={notification.type}
                    markAsRead={() => markAsRead(notification.id)}
                  />
                ))}
                <NotificationItem
                  value={getLatestNotification()}
                  type="default"
                  data-priority="default"
                />
              </ul>
            </div>
          </div>
        )}
      </>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  getUnreadNotifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string,
      value: PropTypes.string,
      html: PropTypes.shape({
        __html: PropTypes.string,
      }),
    })
  ),
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markAsRead: PropTypes.func,
  fetchNotifications: PropTypes.func,
};

Notifications.defaultProps = {
  displayDrawer: false,
  getUnreadNotifications: [],
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markAsRead: () => {},
  fetchNotifications: () => {},
  setNotificationFilter: () => {},
};

const mapStateToProps = (state) => ({
  getUnreadNotifications: getUnreadNotifications(state),
});

export { mapStateToProps };

const mapDispatchToProps = {
  fetchNotifications,
  markAsRead,
  setNotificationFilter: (filter) => dispatchEvent(setNotificationFilter(filter)),
};

export { Notifications };
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);