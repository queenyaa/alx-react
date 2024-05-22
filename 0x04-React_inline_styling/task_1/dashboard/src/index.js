import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App/App';
import { StyleSheet, css } from 'aphrodite';


const rootElement = document.getElementById('root');
createRoot(rootElement).render(<App />);