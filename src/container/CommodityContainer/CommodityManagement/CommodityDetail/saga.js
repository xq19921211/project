/**
 * Created by xu.long on 2018/5/21.
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import {
  initCommodityDetailError,
  initCommodityDetailFailed,
  initCommodityDetailSuccess,
} from './action';

import { COMMODITY_DETAIL } from './constant';
import { message } from 'antd';
import { request } from '../../../../util/request';

function* initCommodityDetail(action) {
  try {
    const req = {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      url: window.hempConfig.apiPath + '/product/detail/' + action.payload.id,
    };
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
      if (json.code === 0) {
        yield put(initCommodityDetailSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '商品详情查询失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initCommodityDetailFailed(response.status));
      message.error('商品详情查询失败');
    }
  } catch (e) {
    yield put(initCommodityDetailError(e));
    message.error('系统错误');
  }
}
export default function* commodityDetailSaga() {
  yield takeEvery(COMMODITY_DETAIL, initCommodityDetail);
}
