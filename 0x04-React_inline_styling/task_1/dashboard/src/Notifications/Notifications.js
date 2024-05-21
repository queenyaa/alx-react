import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import '../Notifications/Notifications.css';
import { StyleSheet, css } from 'aphrodite';
import closeIcon from './../assets/closeicon.png';
import NotificationItem from './NotificationItem';
import NotificationItemShape from './NotificationItemShape';
import { getLatestNotification } from '../utils/utils';

class Notifications extends Component {
  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  };

  shouldComponentUpdate(nextProps) {
    // Only update if the length of the new listNotifications is longer than the previous one
    return nextProps.listNotifications.length > this.props.listNotifications.length;
  }
  render() {
    const { displayDrawer, listNotifications } = this.props;
    return (
        <>
          <div className={`Notifications ${displayDrawer ? 'active' : ''}`}>
            <div className={css(styles.menuItem)}>
              <p>Your notifications</p>
            </div>
          </div>
          {displayDrawer && (
            <div className={css(styles.notifications)}>
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  position: "absolute",
                  right: 5,
                  top: 5,
                }}
                aria-label="close"
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
    };
  };

  const styles = StyleSheet.create({
    menuItem: {
      textAlign: 'right',
      position: 'fixed',
      top: '10px',
      right: '10px',
      backgroundColor: '#ffffff',
      padding: '10px',
      cursor: 'pointer',
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
  });
    
Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
};

// Notifications.defaultProps = {
  // displayDrawer: false,
  // listNotifications: [],
// };
  
export default Notifications;