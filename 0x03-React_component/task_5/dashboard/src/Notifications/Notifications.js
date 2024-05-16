import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Notifications/Notifications.css';
import closeIcon from './../assets/closeicon.png';
import NotificationItem from './NotificationItem';
import NotificationItemShape from './NotificationItemShape';
import { getLatestNotification } from '../utils/utils';

class Notifications extends Component {
  shouldComponentUpdate(nextProps) {
    // Compare the length of the new listNotifications array with the current one
    return nextProps.listNotifications.length > this.props.listNotifications.length;
  }

  render() {
    const { displayDrawer, listNotifications } = this.props;

    return (
      <div className="Notifications">
        <button
          aria-label="Close"
          onClick={() => console.log('Close button has been clicked')}
          style={{
            position: 'absolute',
            right: 10,
            top: 10,
            visibility: displayDrawer ? 'visible' : 'hidden',
          }}
        >
          {'<'}
        </button>
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
              markAsRead={() => console.log(`Notification ${notification.id} has been marked as read`)}
            />
          ))}
        </ul>
      </div>
    );
  }
}

// Notifications.propTypes = {
//   displayDrawer: PropTypes.bool.isRequired,
//  listNotifications: PropTypes.arrayOf(
//    PropTypes.shape({
//      id: PropTypes.number.isRequired,
//      type: PropTypes.string.isRequired,
//      value: PropTypes.string,
//      html: PropTypes.shape({ __html: PropTypes.string }),
//    }),
//  ).isRequired,
// };


Notifications.defaultProps = {
displayDrawer: false,
listNotifications: [],
};

Notifications.propTypes = {
  displayDrawer: PropTypes.bool.isRequired,
  listNotifications: PropTypes.arrayOf(NotificationItemShape).isRequired,
};
  
export default Notifications;