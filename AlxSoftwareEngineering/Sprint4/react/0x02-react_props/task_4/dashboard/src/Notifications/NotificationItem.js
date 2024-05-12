import React from 'react';
import PropTypes from 'prop-types';

function NotificationItem({ type, html, value }) {
  return (
    <li data-notification-type={type}>
      {html ? (
        <div dangerouslySetInnerHTML={html} />
      ) : (
        <span>{value}</span>
      )}
    </li>
  );
}

NotificationItem.propTypes = {
  type: PropTypes.string.isRequired,
  html: PropTypes.shape({
    __html: PropTypes.string.isRequired
  }),
  value: PropTypes.string.isRequired
};

NotificationItem.defaultProps = {
  type: 'default',
  html: null
};

export default NotificationItem;