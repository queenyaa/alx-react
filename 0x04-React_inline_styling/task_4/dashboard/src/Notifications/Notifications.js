import React, { Component } from 'react';
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

class Notifications extends Component {
  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  shouldComponentUpdate(nextProps) {
    // Only update if the length of the new listNotifications is longer than the previous one
    return nextProps.listNotifications.length > this.props.listNotifications.length;
  }

  render() {
    const { displayDrawer, listNotifications } = this.props;
    return (
      <>
        <div className={css(styles.menuItem, displayDrawer && styles.hidden)}>
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
              onClick={() => console.log('Close button has been clicked')}
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
                    type={notification.type}
                    value={notification.value}
                    html={notification.html}
                    data-priority={notification.type}
                  />
                ))}
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
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
};

export default Notifications;