import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './reducer';

const store = createStore(rootReducer)

const app = (
  <Provider store={store}>
    <App/>
  </Provider>);

ReactDOM.render(
  app
, document.querySelector('#root'))

reportWebVitals();
