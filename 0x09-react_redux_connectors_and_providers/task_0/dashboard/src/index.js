import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App/App';
import { StyleSheet, css } from 'aphrodite';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import uiReducer, { initialState } from './reducers/uiReducer';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';


const store = createStore(uiReducer);
// const store = createStore(uiReducer, Map(initialState));
const rootElement = document.getElementById('root');
createRoot(rootElement).render(
    <Provider store={store}>
        <App />
    </Provider>
);

// ReactDOM.render(
//    <React.StrictMode>
//    <Provider store={store}>
//        <App />
//    </Provider>
//    </React.StrictMode>,
//    document.getElementById('root')
// );