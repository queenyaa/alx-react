import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import closeIcon from './../assets/closeicon.png';
import NotificationItem from './NotificationItem';
import NotificationItemShape from './NotificationItemShape';
import { getLatestNotification } from '../utils/utils';

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
  render() {
    const { displayDrawer, listNotifications, handleDisplayDrawer, handleHideDrawer, markNotificationAsRead } = this.props;
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
              onClick={handleHideDrawer}
            >
              <img src={closeIcon} alt="close-icon" height="10" width="10" />
            </button>
            <div className={css(styles.notificationsList)}>
              <p>Here is the list of notifications</p>
              <ul>
                {listNotifications.length === 0 && (
                  <NotificationItem value="No new notification for now" />
                )}
                {listNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    id={notification.id}
                    type={notification.type}
                    value={notification.value}
                    html={notification.html}
                    data-priority={notification.type}
                    markAsRead={() => markNotificationAsRead(notification.id)}
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
  listNotifications: PropTypes.arrayOf(
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
  markNotificationAsRead: PropTypes.func,
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markNotificationAsRead: () => {},
};

export default Notifications;