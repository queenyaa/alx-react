import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  login: {
    color: 'black',
    minHeight: '50vh',
    marginTop: '40px',
  },
  label: {
    marginRight: '10px',
  },
  input: {
    marginRight: '10px',
  },
  button: {
    marginTop: '10px',
  },
  '@media (max-width: 900px)': {
    login: {
      flexDirection: 'column',
    },
    label: {
      marginRight: '0',
      marginBottom: '10px',
    },
    input: {
      marginRight: '0',
      marginBottom: '10px',
    },
    button: {
      marginTop: '0',
    },
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      email: '',
      password: '',
      isLoggedIn: false,
      enableSubmit: false,
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    this.setState({ isLoggedIn: true });
  }

  handleChangeEmail(event) {
    const email = event.target.value;
    this.setState({ email }, this.toggleSubmitButton);
  }

  handleChangePassword(event) {
    const password = event.target.value;
    this.setState({ password }, this.toggleSubmitButton);
  }

  toggleSubmitButton() {
    const { email, password } = this.state;
    this.setState({ enableSubmit: email !== '' && password !== '' });
  }

  render() {
    const { email, password, enableSubmit } = this.state;
    return (
      <div className={css(styles.login)}>
        <p>Login to access the full dashboard</p>
        <form onSubmit={this.handleLoginSubmit}>
          <label
            htmlFor="email"
            className={css(styles.label)}
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            value={email}
            onChange={this.handleChangeEmail}
            className={css(styles.input)}
          />
          <label
            htmlFor="password"
            className={css(styles.label)}
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            value={password}
            onChange={this.handleChangePassword}
            className={css(styles.input)}
          />
          <input
            type="submit"
            value="OK"
            className={css(styles.button)}
            disabled={!enableSubmit}
          />
        </form>
      </div>
    );
  }
}

export default Login;