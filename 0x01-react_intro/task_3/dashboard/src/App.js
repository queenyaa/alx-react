/* eslint-disable jsx-a11y/alt-text */
import logo from '../src/holberton-logo.jpg';
import './App.css';
import { getFooterCopy } from './utils';
import React from 'react';
import Notifications from './Notifications'

function App() {
  const handleClick = (event) => {
    const inputId = event.target.getAttribute('for');
    if (inputId) {
      document.getElementById(inputId).focus();
    }
  };

  return (
    <div className="App">
      {/* Other content */}
      <Notifications />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>School dashboard</h1>
      </header>
      <div className="App-body">
        <p>Login to access the full dashboard</p>
        <label htmlFor="email" onClick={handleClick} style={{ marginRight: '10px' }}>
          Email:
        </label>
        <input type="email" id="email" />
        <label htmlFor="password" onClick={handleClick} style={{ marginRight: '10px' }}>
          Password:
        </label>
        <input type="password" id="password" />
        <button>OK</button>
      </div>
      <footer className="App-footer">
        <p>{getFooterCopy()}</p>
      </footer>
    </div>
  );
}

export default App;