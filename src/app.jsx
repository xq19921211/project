/**
 * Created by xu.long on 25/03/2018.
 */

import 'react-hot-loader/patch';
import 'babel-polyfill';
import '!style-loader!css-loader!antd/dist/antd.min.css';
import './style.scss';
import '!style-loader!css-loader!ant-design-pro/dist/ant-design-pro.css';
import 'moment/locale/zh-cn';

import * as log from 'loglevel';

import { applyMiddleware, compose, createStore } from 'redux';

import { AppContainer } from 'react-hot-loader';
import Es6Promise from 'es6-promise';
import { LocaleProvider } from 'antd';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { RootRoute } from './container/RootRoute';
import address from './mock/address.json';
import basic from './mock/basic.json';
import createHashHistory from 'history/createHashHistory';
import createReducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import moment from 'moment';
import rootSaga from './saga';
import { routerMiddleware } from 'react-router-redux';
import zhCN from 'antd/lib/locale-provider/zh_CN';

moment.locale('zh-cn');

Es6Promise.polyfill();

// create the saga middleware 创建中间件
const sagaMiddleware = createSagaMiddleware();

// Create a history
let appBase = '/www';
let basepath = window.location.href.match(/\/\/([^\/]*)\/(.*)\/www/);
if (basepath !== undefined && basepath !== null && basepath.length == 3) {
  appBase = '/' + basepath[2] + appBase;
}
const history = createHashHistory();
window.myHistory = history;

// Create react-router-redux middleware
const reduxRouterMiddleware = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  createReducer(undefined),
  composeEnhancers(applyMiddleware(sagaMiddleware, reduxRouterMiddleware)),
);
window.store = store;
sagaMiddleware.run(rootSaga);

// set log level
if (process.env.NODE_ENV === 'production') {
  log.setLevel('info');
} else {
  log.setLevel('debug');
  window.hempConfig = {
    apiPath: '/api',
    basePath: '',
  };
}

window.address = address;
window.basic = basic[0];

ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <AppContainer>
      <Provider store={store}>
        <RootRoute />
      </Provider>
    </AppContainer>
  </LocaleProvider>,
  document.getElementById('rootElement'),
);
