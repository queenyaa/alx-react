/* eslint-disable jsx-a11y/alt-text */
import logo from '../src/holberton-logo.jpg';
import './App.css';
import { getFooterCopy } from './utils';
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>School dashboard</h1>
      </header>
      <div className="App-body">
        <p>Login to access the full dashboard</p>
      </div>
      <footer className="App-footer">
        <p>{getFooterCopy()}</p>
      </footer>
    </div>
  );
}

export default App;