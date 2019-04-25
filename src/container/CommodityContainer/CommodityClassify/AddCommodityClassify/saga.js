/**
 * Created by xu.long on 2018/6/5.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { message } from 'antd';
import { ADD_COMMODITY_CLASSIFY, COMMODITY_CLASSIFY_DETAIL } from './constant';
import {
  submitSuccess,
  submitError,
  submitFailed,
  initCommodityClassifyDetailSuccess,
  initCommodityClassifyDetailFailed,
  initCommodityClassifyDetailError,
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
        url: window.hempConfig.apiPath + '/category/product/edit',
      };
      const response = yield call(request, req);
      if (response.ok) {
        let json = yield response.json();
        // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
        if (json.code === 0) {
          yield put(submitSuccess(json));
          message.success('编辑商品分类成功');
          window.myHistory.goBack();
        } else if (json.code === 1) {
          message.error(!json.data ? '编辑商品分类失败' : json.data);
        }
      } else {
        // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
        yield put(submitFailed(response.status));
        message.error('编辑商品分类失败');
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
        url: window.hempConfig.apiPath + '/category/product/add',
      };
      const response = yield call(request, req);
      if (response.ok) {
        let json = yield response.json();
        // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
        if (json.code === 0) {
          yield put(submitSuccess(json));
          message.success('新增商品分类成功');
          window.myHistory.goBack();
        } else if (json.code === 1) {
          message.error(!json.data ? '新增商品分类失败' : json.data);
        }
      } else {
        // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
        yield put(submitFailed(response.status));
        message.error('新增商品分类失败');
      }
    }
  } catch (e) {
    yield put(submitError(e));
    message.error('系统错误');
  }
}
function* initCommodityClassifyDetail(action) {
  try {
    const req = {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      url: window.hempConfig.apiPath + '/category/product/' + action.payload.id,
    };
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});

      if (json.code === 0) {
        yield put(initCommodityClassifyDetailSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '商品分类详情查询失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initCommodityClassifyDetailFailed(response.status));
      message.error('商品分类详情查询失败');
    }
  } catch (e) {
    yield put(initCommodityClassifyDetailError(e));
    message.error('系统错误');
  }
}
export default function* addCommodityClassifySaga() {
  yield takeEvery(ADD_COMMODITY_CLASSIFY, submit);
  yield takeEvery(COMMODITY_CLASSIFY_DETAIL, initCommodityClassifyDetail);
}
