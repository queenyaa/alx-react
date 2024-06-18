import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';

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
  // Media query for screens under 900px width
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

const Login = ({ logIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = (event) => {
    const inputId = event.target.getAttribute('for');
    if (inputId) {
      document.getElementById(inputId).focus();
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    logIn(email, password);
  };

  return (
    <div className={css(styles.login)}>
      <p>Login to access the full dashboard</p>
      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="email" onClick={handleClick} className={css(styles.label)}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="off"
          className={css(styles.input)}
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password" onClick={handleClick} className={css(styles.label)}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="off"
          className={css(styles.input)}
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          type="submit"
          className={css(styles.button)}
          value="OK"
          disabled={!(email && password)}
          onClick={handleLoginSubmit}
        />
      </form>
    </div>
  );
};

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
};

export default Login;