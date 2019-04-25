/**
 * Created by xu.long on 2018/5/25.
 */
import { message } from 'antd';
import { call, put, takeEvery } from 'redux-saga/effects';
import { request } from '../../../../util/request';
import {
  initTenementDetailError,
  initTenementDetailFailed,
  initTenementDetailSuccess,
  submitError,
  submitFailed,
  submitSuccess,
} from './action';
import { ADD_TENEMENT, TENEMENT_DETAIL } from './constant';

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
        url: window.hempConfig.apiPath + '/property/company/edit',
      };
      const response = yield call(request, req);
      if (response.ok) {
        let json = yield response.json();
        // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
        if (json.code === 0) {
          yield put(submitSuccess(json));
          message.success('编辑物业公司成功');
          window.myHistory.goBack();
        } else if (json.code === 1) {
          message.error(!json.data ? '编辑物业公司失败' : json.data);
        }
      } else {
        yield put(submitFailed(response.status));
        message.error('编辑物业公司失败');
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
        url: window.hempConfig.apiPath + '/property/company/add',
      };
      const response = yield call(request, req);
      if (response.ok) {
        let json = yield response.json();
        if (json.code === 0) {
          yield put(submitSuccess(json));
          message.success('新增物业公司成功');
          window.myHistory.goBack();
        } else if (json.code === 1) {
          message.error(!json.data ? '新增物业公司失败' : json.data);
        }
      } else {
        yield put(submitFailed(response.status));
        message.error('新增物业公司失败');
      }
    }
  } catch (e) {
    yield put(submitError(e));
    message.error('系统错误');
  }
}
function* initTenementDetail(action) {
  try {
    const req = {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      url: window.hempConfig.apiPath + '/property/company/' + action.payload.id,
    };
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();

      if (json.code === 0) {
        yield put(initTenementDetailSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '物业公司详情查询失败' : json.data);
      }
    } else {
      yield put(initTenementDetailFailed(response.status));
      message.error('物业公司详情查询失败');
    }
  } catch (e) {
    yield put(initTenementDetailError(e));
    message.error('系统错误');
  }
}
export default function* addTenementSaga() {
  yield takeEvery(ADD_TENEMENT, submit);
  yield takeEvery(TENEMENT_DETAIL, initTenementDetail);
}
