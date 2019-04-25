/**
 * Created by xu.long on 2018/5/25.
 */

import { ADD_MERCHANT, MERCHANT_DETAIL } from './constant';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  initMerchantDetailError,
  initMerchantDetailFailed,
  initMerchantDetailSuccess,
  submitError,
  submitFailed,
  submitSuccess,
} from './action';

import { message } from 'antd';
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
        url: window.hempConfig.apiPath + '/supplier/edit',
      };
      const response = yield call(request, req);
      if (response.ok) {
        let json = yield response.json();
        // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
        if (json.code === 0) {
          yield put(submitSuccess(json));
          message.success('编辑保安公司成功');
          window.myHistory.goBack();
        } else if (json.code === 1) {
          message.error(!json.data ? '编辑保安公司失败' : json.data);
        }
      } else {
        // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
        yield put(submitFailed(response.status));
        message.error('编辑保安公司失败');
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
        url: window.hempConfig.apiPath + '/supplier/add',
      };
      const response = yield call(request, req);
      if (response.ok) {
        let json = yield response.json();
        // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
        if (json.code === 0) {
          yield put(submitSuccess(json));
          message.success('新增保安公司成功');
          window.myHistory.goBack();
        } else if (json.code === 1) {
          message.error(!json.data ? '新增保安公司失败' : json.data);
        }
      } else {
        // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
        yield put(submitFailed(response.status));
        message.error('新增保安公司失败');
      }
    }
  } catch (e) {
    yield put(submitError(e));
    message.error('系统错误');
  }
}
function* initMerchantDetail(action) {
  try {
    const req = {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      url: window.hempConfig.apiPath + '/supplier/' + action.payload.id,
    };
    // const url = window.hempConfig.basePath + '/supplier/' + action.payload.id;
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});

      if (json.code === 0) {
        yield put(initMerchantDetailSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '部门详情查询失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initMerchantDetailFailed(response.status));
      message.error('部门详情查询失败');
    }
  } catch (e) {
    yield put(initMerchantDetailError(e));
    message.error('系统错误');
  }
}
export default function* addMerchantSaga() {
  yield takeEvery(ADD_MERCHANT, submit);
  yield takeEvery(MERCHANT_DETAIL, initMerchantDetail);
}
