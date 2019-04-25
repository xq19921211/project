/**
 * Created by xu.long on 2018/5/20.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { message } from 'antd';
import { ADD_COMMODITY, INIT_UNIT } from './constant';
import {
  submitSuccess,
  submitError,
  submitFailed,
  initUnitSuccess,
  initUnitError,
  initUnitFailed,
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
        xhrFields: {
          withCredentials: true,
        },
        body: JSON.stringify(action.payload),
        url: window.hempConfig.apiPath + '/product/modify',
      };
      const response = yield call(request, req);
      if (response.ok) {
        let json = yield response.json();
        // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
        if (json.code === 0) {
          yield put(submitSuccess(json));
          message.success('编辑商品成功');
          window.myHistory.goBack();
        } else if (json.code === 1) {
          message.error(!json.data ? '编辑商品失败' : json.data);
        }
      } else {
        // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
        yield put(submitFailed(response.status));
        message.error('编辑商品失败');
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
        url: window.hempConfig.apiPath + '/product/add',
      };
      const response = yield call(request, req);
      if (response.ok) {
        let json = yield response.json();
        // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
        if (json.code === 0) {
          yield put(submitSuccess(json));
          message.success('新增商品成功');
          window.myHistory.goBack();
        } else if (json.code === 1) {
          message.error(!json.data ? '新增商品失败' : json.data);
        }
      } else {
        // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
        yield put(submitFailed(response.status));
        message.error('新增商品失败');
      }
    }
  } catch (e) {
    yield put(submitError(e));
    message.error('系统错误');
  }
}
function* initUnit(action) {
  try {
    const url = urlGenerator(
      window.hempConfig.apiPath + '/data/unit',
      action.payload,
    );
    const req = {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      url: url,
    };
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
      yield put(initUnitSuccess(json));
      // if(json.code === 0){
      //     yield put(initUnitSuccess(json));
      // } else if(json.code === 1){
      //     message.error(!json.data? '单位查询失败': json.data);
      // }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initUnitError(response.status));
      message.error('单位查询失败');
    }
  } catch (e) {
    yield put(initUnitFailed(e));
    message.error('系统错误');
  }
}
export default function* addCommoditySaga() {
  yield takeEvery(ADD_COMMODITY, submit);
  yield takeEvery(INIT_UNIT, initUnit);
}
