import React from 'react';
import './Login.css';

export default function Login() {
    return (
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
    );
}