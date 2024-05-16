import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NotificationItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { id, markAsRead } = this.props;
    markAsRead(id);
  }

  render() {
    const { id, type = "default", html = { __html: '' }, value = '' } = this.props;
    
    return (
      <li data-notification-type={type} onClick={this.handleClick}>
        {value ? value : <span dangerouslySetInnerHTML={html}></span>}
      </li>
    );
  }
}

// NotificationItem.defaultProps = {
  // type: "default",
  // value: "",
  // html: {},
// };

NotificationItem.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
  value: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  markAsRead: PropTypes.func,
};

export default NotificationItem;