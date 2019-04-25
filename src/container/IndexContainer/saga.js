/**
 * Created by xu.long on 27/03/2018.
 */

import { GET_MENU_LIST, GET_USER_INFO, MODIFY_PASSWORD } from './constant';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  initMenuListError,
  initMenuListFailed,
  initMenuListSuccess,
  initUserInfoError,
  initUserInfoFailed,
  initUserInfoSuccess,
  modifyPasswordError,
  modifyPasswordSuccess,
} from './action';
import { post, request } from '../../util/request';

import fetch from 'isomorphic-fetch';
import { message } from 'antd';

function* getMenuList(action) {
  try {
    const req = {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Cache-Control': ' no-cache',
      },
      url: window.hempConfig.apiPath + '/menu/getMenuList',
    };
    const response = yield call(request, req);

    // window.myHistory.push('index');
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});

      if (json.code === 0) {
        yield put(initMenuListSuccess(json));
      } else if (json.code === 1) {
        message.error('初始化菜单列表失败');
      }
    } else {
      console.log('3');
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initMenuListFailed(response.status));
      message.error('初始化菜单列表失败');
    }
  } catch (e) {
    console.log('4');
    yield put(initMenuListError(e));
    message.error('系统错误');
  }
}
function* getUserInfo(action) {
  try {
    const req = {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Cache-Control': ' no-cache',
      },
      url: window.hempConfig.apiPath + '/user/login',
    };
    const response = yield call(request, req);
    // window.myHistory.push('index');
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});

      if (json.code === 0) {
        yield put(initUserInfoSuccess(json));
      } else if (json.code === 1) {
        message.error('获取用户信息失败');
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initUserInfoFailed(response.status));
      message.error('获取用户信息失败');
    }
  } catch (e) {
    yield put(initUserInfoError(e));
    message.error('系统错误');
  }
}

function* modifyPassword(action) {
  try {
    const response = yield call(post, '/user/modifyPassword', action.payload);
    yield put(modifyPasswordSuccess(response));
    message.success('修改密码成功');
    window.myHistory.push('/login');
  } catch (e) {
    yield put(modifyPasswordError(e.message));
    message.error(e.code ? e.message : '修改密码失败');
  }
}
export default function* getMenuListSaga() {
  yield takeEvery(GET_MENU_LIST, getMenuList);
  yield takeEvery(GET_USER_INFO, getUserInfo);
  yield takeEvery(MODIFY_PASSWORD, modifyPassword);
}
