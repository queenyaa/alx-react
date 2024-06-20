import React from 'react';
import { connect } from 'react-redux';
import { getFooterCopy } from '../utils/utils';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  footer: {
    marginBottom: '0px',
    borderTop: '2px solid red',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  }
});

const Footer = ({ user = { email: '', isLoggedIn: false } }) => {
  return (
    <footer style={styles.footer} className={css(styles.footer)}>
      <p>{getFooterCopy()}</p>
      {user.isLoggedIn && (
      <p>
        <a href="mailto:support@example.com" style={styles.link}>Contact us</a>
      </p>
      )}
    </footer>
  );
};

Footer.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    isLoggedIn: PropTypes.bool
  })
};

Footer.defaultProps = {
  user: { email: '', isLoggedIn: false }
};

const mapStateToProps = (state) => ({
  // user: state.get('user') ? state.get('user').toJS() : { email: '', isLoggedIn: false }.toJS(),
  user: state.user ? { ...state.user } : { email: '', isLoggedIn: false },
});

export default connect(mapStateToProps)(Footer);