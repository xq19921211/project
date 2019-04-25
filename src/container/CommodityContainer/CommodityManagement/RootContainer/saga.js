/**
 * Created by xu.long on 2018/5/16.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { message } from 'antd';
import { COMMODITY_MANAGEMENT, TREE, MODIFY_LIST_STATUS } from './constant';
import {
  initCommodityListSuccess,
  initCommodityListError,
  initCommodityListFailed,
  initTreeListSuccess,
  initTreeListError,
  initTreeListFailed,
  modifyListStatusSuccess,
  modifyListStatusError,
  modifyListStatusFailed,
} from './action';
import { urlGenerator } from '../../../../util/util';
import { request } from '../../../../util/request';
function* initCommodityList(action) {
  try {
    const url = urlGenerator(
      window.hempConfig.apiPath + '/product/list',
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
      if (json.code === 0) {
        yield put(initCommodityListSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '商品查询失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initCommodityListError(response.status));
      message.error('商品查询失败');
    }
  } catch (e) {
    yield put(initCommodityListFailed(e));
    message.error('系统错误');
  }
}
function* initTreeList(action) {
  try {
    // const url = urlGenerator(window.hempConfig.basePath + '/category/product/all');
    const req = {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      url: window.hempConfig.apiPath + '/category/product/all',
    };
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});

      if (json.code === 0) {
        yield put(initTreeListSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '商品类目查询失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initTreeListFailed(response.status));
      message.error('商品类目查询失败');
    }
  } catch (e) {
    yield put(initTreeListError(e));
    message.error('系统错误');
  }
}
function* modifyListStatus(action) {
  try {
    const req = {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify({
        id: action.payload.id,
        status: action.payload.status,
      }),
      url: window.hempConfig.apiPath + '/product/modify',
    };
    const response = yield call(request, req);
    yield put(modifyListStatusSuccess({ json: null, record: action.payload }));
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
      if (json.code === 0) {
        yield put(
          modifyListStatusSuccess({
            json: json,
            record: action.payload,
          }),
        );
        message.success('商品状态修改成功');
        // window.myHistory.goBack();
      } else if (json.code === 1) {
        message.error(!json.data ? '商品状态修改成功' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(modifyListStatusFailed(response.status));
      message.error('商品状态修改失败');
    }
  } catch (e) {
    yield put(modifyListStatusError(e));
    message.error('系统错误');
  }
}
export default function* commodityManagementSaga() {
  yield takeEvery(COMMODITY_MANAGEMENT, initCommodityList);
  yield takeEvery(TREE, initTreeList);
  yield takeEvery(MODIFY_LIST_STATUS, modifyListStatus);
}
