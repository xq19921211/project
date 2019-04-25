/**
 * Created by xu.long on 2018/6/23.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { message } from 'antd';
import { ADD_ROLE, ROLE_DETAIL } from './constant';
import {
  submitSuccess,
  submitError,
  submitFailed,
  initRoleDetailSuccess,
  initRoleDetailFailed,
  initRoleDetailError,
} from './action';
import { urlGenerator } from '../../../../util/util';
import { request } from '../../../../util/request';
function* submit(action) {
  try {
    if (action.payload.action === 'edit') {
      const req = {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify(action.payload),
        url: window.hempConfig.apiPath + '/role/modify',
      };
      const response = yield call(request, req);
      if (response.ok) {
        let json = yield response.json();
        // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
        if (json.code === 0) {
          yield put(submitSuccess(json));
          message.success('编辑角色成功');
          window.myHistory.goBack();
        } else if (json.code === 1) {
          message.error(!json.data ? '编辑角色失败' : json.data);
        }
      } else {
        // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
        yield put(submitFailed(response.status));
        message.error('编辑角色失败');
      }
    } else {
      const req = {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify(action.payload),
        url: window.hempConfig.apiPath + '/role/add',
      };
      const response = yield call(request, req);
      if (response.ok) {
        let json = yield response.json();
        // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
        if (json.code === 0) {
          yield put(submitSuccess(json));
          message.success('新增角色成功');
          window.myHistory.goBack();
        } else if (json.code === 1) {
          message.error(!json.data ? '新增角色失败' : json.data);
        }
      } else {
        // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
        yield put(submitFailed(response.status));
        message.error('新增角色失败');
      }
    }
  } catch (e) {
    yield put(submitError(e));
    message.error('系统错误');
  }
}
function* initRoleDetail(action) {
  try {
    const req = {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      url: window.hempConfig.apiPath + '/role/detail/' + action.payload.id,
    };
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
      if (json.code === 0) {
        yield put(initRoleDetailSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '角色详情查询失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initRoleDetailFailed(response.status));
      message.error('角色详情查询失败');
    }
  } catch (e) {
    yield put(initRoleDetailError(e));
    message.error('系统错误');
  }
}
export default function* addRoleSaga() {
  yield takeEvery(ADD_ROLE, submit);
  yield takeEvery(ROLE_DETAIL, initRoleDetail);
}
