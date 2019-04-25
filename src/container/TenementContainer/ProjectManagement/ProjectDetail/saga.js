/**
 * Created by xu.long on 2018/5/26.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { message } from 'antd';
import { PROJECT_DETAIL, AREA_PRO_LIST } from './constant';
import {
  initProjectDetailSuccess,
  initProjectDetailFailed,
  initProjectDetailError,
  initAreProjectListSuccess,
  initAreProjectListFailed,
  initAreProjectListError,
} from './action';
import { urlGenerator } from '../../../../util/util';
import { request } from '../../../../util/request';
function* initProjectDetail(action) {
  try {
    const req = {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      url: window.hempConfig.apiPath + '/project/detail/' + action.payload.id,
    };
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
      if (json.code === 0) {
        yield put(initProjectDetailSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '项目详情查询失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initProjectDetailFailed(response.status));
      message.error('项目详情查询失败');
    }
  } catch (e) {
    yield put(initProjectDetailError(e));
    message.error('系统错误');
  }
}
function* initAreProjectList(action) {
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
        window.hempConfig.apiPath + '/area/list',
        action.payload,
      ),
    };
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
      if (json.code === 0) {
        yield put(initAreProjectListSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '区域项目列表查询失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initAreProjectListFailed(response.status));
      message.error('区域项目列表查询失败');
    }
  } catch (e) {
    yield put(initAreProjectListError(e));
    message.error('系统错误');
  }
}
export default function* projectDetailSaga() {
  yield takeEvery(PROJECT_DETAIL, initProjectDetail);
  yield takeEvery(AREA_PRO_LIST, initAreProjectList);
}
