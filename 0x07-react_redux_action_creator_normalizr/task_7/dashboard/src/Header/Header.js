import React, { Component } from 'react';
import logo from './../assets/holbertonlogo.jpg';
import { StyleSheet, css } from 'aphrodite';
import { AppContext } from './../App/AppContext';

class Header extends Component {
  static contextType = AppContext;

  render() {
    const { user, logOut } = this.context;

    return (
      <header className={css(styles.appHeader)}>
        <img src={logo} className={css(styles.appLogo)} alt="logo" />
        <h1 className={css(styles.appTitle)}>School dashboard</h1>
        {user.isLoggedIn && (
          <div id="logoutSection" data-testid="logoutSection" onClick={logOut}>
            Welcome {user.email} (<button onClick={logOut}>log out</button>)
          </div>
        )}
      </header>
    );
  }
}

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

export default Header;