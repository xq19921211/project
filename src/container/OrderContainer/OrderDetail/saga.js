/**
 * Created by xu.long on 2018/5/21.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { message } from 'antd';
import {
  ORDER_DETAIL,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_ERROR,
  ORDER_DETAIL_FAILED,
} from './constant';
import {
  initOrderDetailSuccess,
  initOrderDetailFailed,
  initOrderDetailError,
} from './action';
import { urlGenerator } from '../../../util/util';
import { request } from '../../../util/request';
function* initOrderDetail(action) {
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
        yield put(initOrderDetailSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '订单详情查询失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initOrderDetailFailed(response.status));
      message.error('订单详情查询失败');
    }
  } catch (e) {
    yield put(initOrderDetailError(e));
    message.error('系统错误');
  }
}
export default function* orderDetailSaga() {
  yield takeEvery(ORDER_DETAIL, initOrderDetail);
}
