/**
 * Created by xu.long on 2018/6/23.
 */
import { message } from 'antd';

import { call, put, takeEvery } from 'redux-saga/effects';
import { request, get, post } from '../../../../util/request';
import { submitError, submitFailed, submitSuccess } from './action';
import * as actions from './action';
import { ADD_HOME_PICTURE, HOME_PICTURE_DETAIL } from './constant';
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
        url: window.hempConfig.apiPath + '/h5banner/modify',
      };
      const response = yield call(request, req);
      if (response.ok) {
        let json = yield response.json();
        if (json.code === 0) {
          yield put(submitSuccess(json));
          message.success('编辑首页轮播图成功');
          window.myHistory.goBack();
        } else if (json.code === 1) {
          message.error(!json.data ? '编辑首页轮播图失败' : json.data);
        }
      } else {
        yield put(submitFailed(response.status));
        message.error('编辑首页轮播图失败');
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
        url: window.hempConfig.apiPath + '/h5banner/add',
      };
      const response = yield call(request, req);
      if (response.ok) {
        let json = yield response.json();
        if (json.code === 0) {
          yield put(submitSuccess(json));
          message.success('新增首页轮播图成功');
          window.myHistory.goBack();
        } else if (json.code === 1) {
          message.error(!json.data ? '新增首页轮播图失败' : json.data);
        }
      } else {
        yield put(submitFailed(response.status));
        message.error('新增首页轮播图失败');
      }
    }
  } catch (e) {
    yield put(submitError(e));
    message.error('系统错误');
  }
}
function* initHomePictureDetail(action) {
  try {
    const response = yield call(get, '/h5banner/detail/' + action.payload.id);
    yield put(actions.initHomePictureDetailSuccess(response));
  } catch (e) {
    yield put(actions.initHomePictureDetailError(e.message));
    message.error(e.code ? e.message : '首页轮播图详情查询失败');
  }
}
export default function* addHomePictureSaga() {
  yield takeEvery(ADD_HOME_PICTURE, submit);
  yield takeEvery(HOME_PICTURE_DETAIL, initHomePictureDetail);
}
