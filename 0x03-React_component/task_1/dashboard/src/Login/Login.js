import React from 'react';
import './Login.css';

export default function Login() {
  const handleClick = (event) => {
    const inputId = event.target.getAttribute('for');
    if (inputId) {
      document.getElementById(inputId).focus();
    }
  };
  
    return (
        <div className="login">
        <p>Login to access the full dashboard</p>
        <label htmlFor="email" onClick={handleClick} style={{ marginRight: '10px' }}>
          Email:
        </label>
        <input type="email" id="email" name="email" autocomplete="off" />
        <label htmlFor="password" onClick={handleClick} style={{ marginRight: '10px' }}>
          Password:
        </label>
        <input type="password" id="password" name="password" autocomplete="off" />
        <button>OK</button>
      </div>
    );
}