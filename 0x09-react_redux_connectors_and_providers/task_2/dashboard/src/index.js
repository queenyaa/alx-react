import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App/App';
import { StyleSheet, css } from 'aphrodite';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import uiReducer, { initialState } from './reducers/uiReducer';
import { thunk } from 'redux-thunk';

const store = createStore(uiReducer, applyMiddleware(thunk));
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