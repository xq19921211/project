/**
 * Created by xu.long on 2018/5/27.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { message } from 'antd';
import { ACCOUNT_DETAIL } from './constant';
import {
  initAccountDetailSuccess,
  initAccountDetailFailed,
  initAccountDetailError,
} from './action';
import { urlGenerator } from '../../../../util/util';
import { request } from '../../../../util/request';
function* initAccountDetail(action) {
  try {
    const req = {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      url: window.hempConfig.apiPath + '/manager/' + action.payload.id,
    };
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
      if (json.code === 0) {
        yield put(initAccountDetailSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '账号详情查询失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initAccountDetailFailed(response.status));
      message.error('账号详情查询失败');
    }
  } catch (e) {
    yield put(initAccountDetailError(e));
    message.error('系统错误');
  }
}
export default function* accountDetailSaga() {
  yield takeEvery(ACCOUNT_DETAIL, initAccountDetail);
}
