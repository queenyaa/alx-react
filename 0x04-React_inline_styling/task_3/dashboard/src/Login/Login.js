import React from 'react';
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

export default function Login() {
  const handleClick = (event) => {
    const inputId = event.target.getAttribute('for');
    if (inputId) {
      document.getElementById(inputId).focus();
    }
  };
  
    return (
        <div className={css(styles.login)}>
        <p>Login to access the full dashboard</p>
        <label htmlFor="email" onClick={handleClick} className={css(styles.label)}>
          Email:
        </label>
        <input type="email" id="email" name="email" autoComplete="off" className={css(styles.input)} />
        <label htmlFor="password" onClick={handleClick} className={css(styles.label)}>
          Password:
        </label>
        <input type="password" id="password" name="password" autoComplete="off" className={css(styles.input)} />
        <button className={css(styles.button)}>OK</button>
      </div>
    );
}