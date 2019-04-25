/**
 * Created by xu.long on 2018/6/18.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { message } from 'antd';
import { COVER_RULE_DETAIL } from './constant';
import {
  initCoverRuleDetailSuccess,
  initCoverRuleDetailFailed,
  initCoverRuleDetailError,
} from './action';
import { urlGenerator } from '../../../../util/util';
import { request } from '../../../../util/request';
function* initCoverRuleDetail(action) {
  try {
    const req = {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      url:
        window.hempConfig.apiPath + '/order/detail/' + action.payload.orderNum,
    };
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
      if (json.code === 0) {
        yield put(initCoverRuleDetailSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '覆盖规则详情查询失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initCoverRuleDetailFailed(response.status));
      message.error('覆盖规则详情查询失败');
    }
  } catch (e) {
    yield put(initCoverRuleDetailError(e));
    message.error('系统错误');
  }
}
export default function* coverRuleDetailSaga() {
  yield takeEvery(COVER_RULE_DETAIL, initCoverRuleDetail);
}
