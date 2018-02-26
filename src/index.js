import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers/index';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { watchAuth } from './store/sagas';

const composeEnhancers =
  process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const sagaMiddleware = createSagaMiddleware();

var store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

sagaMiddleware.run(watchAuth);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
