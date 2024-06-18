import React, { Component } from 'react';
import { AppContext } from '../App/AppContext';
import { getFullYear, getFooterCopy } from '../utils/utils';

const styles = {
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
};

class Footer extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {({ user }) => (
          <footer style={styles.footer} className="App-footer">
            <p>{getFooterCopy()}</p>
            {user.isLoggedIn && (
              <p>
                <a href="mailto:support@example.com" style={styles.link}>Contact us</a>
              </p>
            )}
          </footer>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Footer;