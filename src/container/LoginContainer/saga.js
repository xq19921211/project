/**
 * Created by xu.long on 27/03/2018.
 */

import { GET_CONFIG, LOGIN, LOGOUT } from './constant';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  loginError,
  loginFailed,
  loginSuccess,
  logoutError,
  logoutFailed,
  logoutSuccess,
} from './action';

import fetch from 'isomorphic-fetch';
import { message } from 'antd';
import { request } from '../../util/request';
import { urlGenerator } from '../../util/util';

function* login(action) {
  try {
    // let formData = new FormData();
    // formData.append('username', action.payload.username);
    // formData.append('password', action.payload.password);
    const req = {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Cache-Control': ' no-cache',
      },
      body: JSON.stringify({
        username: action.payload.username,
        password: action.payload.password,
      }),
      url: window.hempConfig.apiPath + '/login',
    };
    const response = yield call(request, req);

    // window.myHistory.push('index');
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
      // yield put(loginSuccess(json));
      if (json.code === 0) {
        window.myHistory.push('/index');
      } else if (json.code === 1) {
        message.error(
          !json.data ? '登录失败，请检查账号密码是否正确' : json.data,
        );
      }
    } else {
      console.log('3');
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(loginFailed(response.status));
      message.error('登录失败，请检查账号密码是否正确');
    }
  } catch (e) {
    console.log('4');
    yield put(loginError(e));
    message.error('系统错误');
  }
}
function* logout(action) {
  try {
    // let formData = new FormData();
    // formData.append('username', action.payload.username);
    // formData.append('password', action.payload.password);
    const req = {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Cache-Control': ' no-cache',
      },
      url: urlGenerator(window.hempConfig.apiPath + '/logout', action.payload),
    };
    const response = yield call(request, req);
    // window.myHistory.push('index');
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
      // yield put(loginSuccess(json));
      if (json.code === 0) {
        window.myHistory.push('/login');
      } else if (json.code === 1) {
        message.error(!json.data ? '登出失败' : json.data);
        window.myHistory.push('/login');
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(logoutFailed(response.status));
      message.error('登出失败');
    }
  } catch (e) {
    yield put(logoutError(e));
    message.error('系统错误');
  }
}
function* getConfig(action) {
  try {
    if (process.env.NODE_ENV === 'development') return;
    const response = yield fetch('mock/config.json');
    if (response.ok) {
      response.json().then(res => {
        console.log(JSON.stringify(res));
        window.localStorage.setItem('hempConfig', JSON.stringify(res));
        window.hempConfig = res;
      });
    } else {
      message.error('获取配置信息失败');
    }
  } catch (e) {
    message.error('系统错误');
  }
}
export default function* loginSaga() {
  yield takeEvery(LOGIN, login);
  yield takeEvery(LOGOUT, logout);
  yield takeEvery(GET_CONFIG, getConfig);
}
