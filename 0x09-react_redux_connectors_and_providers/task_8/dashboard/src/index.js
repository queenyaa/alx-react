import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App/App';
import { composeWithDevTools } from 'redux-devtools-extension';
import { StyleSheet, css } from 'aphrodite';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import { thunk } from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
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