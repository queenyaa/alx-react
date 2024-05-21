import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Notifications/Notifications.css';
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
            <div className="menuItem">
              <p>Your notifications</p>
            </div>
          </div>
          {displayDrawer && (
            <div className="Notifications">
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
              <div className="Notifications-list">
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
    
Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
};

// Notifications.defaultProps = {
  // displayDrawer: false,
  // listNotifications: [],
// };
  
export default Notifications;