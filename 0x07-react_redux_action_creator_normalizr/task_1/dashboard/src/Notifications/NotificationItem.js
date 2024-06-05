import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  default: {
    color: 'blue',
    width: '100%',
    fontSize: '20px',
    padding: '10px 8px',
    borderBottom: '1px solid black',
  },
  urgent: {
    color: 'red',
    width: '100%',
    fontSize: '20px',
    padding: '10px 8px',
    borderBottom: '1px solid black',
  },
});

class NotificationItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    // Compare if the relevant props have changed
    return nextProps.id !== this.props.id ||
           nextProps.type !== this.props.type ||
           nextProps.value !== this.props.value ||
           nextProps.html !== this.props.html;
  }

  handleClick() {
    const { id, markAsRead } = this.props;
    markAsRead(id);
  }

  render() {
    const { type = "default", html = { __html: '' }, value = '' } = this.props;
    
    const style = type === 'urgent' ? styles.urgent : styles.default;
    return (
      <li className={css(style)}
          data-notification-type={type}
          onClick={this.handleClick}>
        {value ? value : <span dangerouslySetInnerHTML={html}></span>}
      </li>
    );
  }
}

NotificationItem.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
  value: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  markAsRead: PropTypes.func,
};

NotificationItem.defaultProps = {
  type: 'default',
  markAsRead: () => {},
};

export default NotificationItem;