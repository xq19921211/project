/**
 * Created by xu.long on 2018/6/6.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { message } from 'antd';
import { MERCHANT_MEMBER_DETAIL } from './constant';
import {
  initMerchantMemberDetailSuccess,
  initMerchantMemberDetailFailed,
  initMerchantMemberDetailError,
} from './action';
import { urlGenerator } from '../../../../util/util';
import { request } from '../../../../util/request';
function* initMerchantMemberDetail(action) {
  try {
    const req = {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      url: window.hempConfig.apiPath + '/sup/staff/' + action.payload.id,
    };
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
      if (json.code === 0) {
        yield put(initMerchantMemberDetailSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '保安公司人员详情查询失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initMerchantMemberDetailFailed(response.status));
      message.error('保安公司人员详情查询失败');
    }
  } catch (e) {
    yield put(initMerchantMemberDetailError(e));
    message.error('系统错误');
  }
}
export default function* merchantMemberDetailSaga() {
  yield takeEvery(MERCHANT_MEMBER_DETAIL, initMerchantMemberDetail);
}
