/**
 * Created by xu.long on 2018/5/19.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { message } from 'antd';
import { ORDER, ORDER_SUCCESS, ORDER_ERROR, ORDER_FAILED } from './constant';
import {
  initOrderListSuccess,
  initOrderListError,
  initOrderListFailed,
} from './action';
import { urlGenerator } from '../../../util/util';
import { request } from '../../../util/request';
function* initOrderList(action) {
  try {
    const req = {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      url: urlGenerator(
        window.hempConfig.apiPath + '/order/list',
        action.payload,
      ),
    };
    // let param;
    // for(let item in action.payload){
    //     param = item + '=' + '&'
    // }
    // const url = urlGenerator(window.hempConfig.basePath + '/order/list', action.payload);
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
      if (json.code === 0) {
        yield put(initOrderListSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '订单查询失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initOrderListFailed(response.status));
      message.error('订单查询失败');
    }
  } catch (e) {
    yield put(initOrderListError(e));
    message.error('系统错误');
  }
}
export default function* orderSaga() {
  yield takeEvery(ORDER, initOrderList);
}
