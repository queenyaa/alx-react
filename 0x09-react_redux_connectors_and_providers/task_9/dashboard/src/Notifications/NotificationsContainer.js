// NotificationsContainer.js

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchNotifications } from './actions/notificationActionCreators';
import Notifications from './Notifications';

const NotificationsContainer = ({ fetchNotifications, ...props }) => {
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return <Notifications {...props} />;
};

const mapStateToProps = (state) => ({
  getUnreadNotifications: getUnreadNotifications(state),
});

const mapDispatchToProps = {
  fetchNotifications,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);
