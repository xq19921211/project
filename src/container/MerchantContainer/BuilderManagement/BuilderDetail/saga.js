/**
 * Created by xu.long on 2018/6/18.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { message } from 'antd';
import { BUILDER_DETAIL } from './constant';
import {
  initBuilderDetailSuccess,
  initBuilderDetailFailed,
  initBuilderDetailError,
} from './action';
import { urlGenerator } from '../../../../util/util';
import { request } from '../../../../util/request';
function* initBuilderDetail(action) {
  try {
    const req = {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      url: window.hempConfig.apiPath + '/operator/' + action.payload.id,
    };
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
      if (json.code === 0) {
        yield put(initBuilderDetailSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '保安队人员详情查询失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initBuilderDetailFailed(response.status));
      message.error('保安队人员详情查询失败');
    }
  } catch (e) {
    yield put(initBuilderDetailError(e));
    message.error('系统错误');
  }
}
export default function* builderDetailSaga() {
  yield takeEvery(BUILDER_DETAIL, initBuilderDetail);
}
