import React, { Component } from 'react';
import logo from './../assets/holbertonlogo.jpg';
import { StyleSheet, css } from 'aphrodite';
import { logout } from '../actions/uiActionCreators';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

export class Header extends Component {
  render() {
    const { user, logout } = this.props;
    return (
      <header className={css(styles.appHeader)}>
        <img src={logo} className={css(styles.appLogo)} alt="logo" />
        <h1 className={css(styles.appTitle)}>School dashboard</h1>
        {user.isLoggedIn && (
          <div id="logoutSection" data-testid="logoutSection" onClick={logout}>
            Welcome {user.email} (<button onClick={logout}>log out</button>)
          </div>
        )}
      </header>
    );
  };
};

const styles = StyleSheet.create({
    appLogo: {
      height: '30vmin',
      pointerEvents: 'none',
      alignItems: 'flex-start',
    },
    appHeader: {
      backgroundColor: '#fff',
      minHeight: '30vh',
      display: 'flex',
      alignItems: 'flex-start',
      fontSize: 'calc(10px + 2vmin)',
      borderBottom: '2px solid red',
    },
    appTitle: {
      color: 'red',
      fontSize: '30px',
      marginTop: '100px',
      fontWeight: 'bold',
    },
  });

  Header.propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string,
      isLoggedIn: PropTypes.bool
    }).isRequired,
    logout: PropTypes.func.isRequired
  };

  const mapStateToProps = (state) => ({
    user: state.get('user') ? state.get('user').toJS() : { email: '', isLoggedIn: false }, // Assuming user is stored as an Immutable Map, convert it to JS object
  });

  const mapDispatchToProps = {
    logout,
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Header);  