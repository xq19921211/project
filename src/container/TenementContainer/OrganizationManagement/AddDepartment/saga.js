/**
 * Created by xu.long on 2018/5/25.
 */
import { message } from 'antd';
import { call, put, takeEvery } from 'redux-saga/effects';
import { request } from '../../../../util/request';
import { urlGenerator } from '../../../../util/util';
import {
  initDepartmentDetailError,
  initDepartmentDetailFailed,
  initDepartmentDetailSuccess,
  initIceListError,
  initIceListFailed,
  initIceListSuccess,
  submitError,
  submitFailed,
  submitSuccess,
} from './action';
import { ADD_DEPARTMENT, DEPARTMENT_DETAIL, ICE_LIST } from './constant';

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
        url: window.hempConfig.apiPath + '/property/department/edit',
      };
      const response = yield call(request, req);
      if (response.ok) {
        let json = yield response.json();
        if (json.code === 0) {
          yield put(submitSuccess(json));
          message.success('编辑部门成功');
          window.myHistory.goBack();
        } else if (json.code === 1) {
          message.error(!json.data ? '编辑部门失败' : json.data);
        }
      } else {
        yield put(submitFailed(response.status));
        message.error('编辑部门失败');
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
        url: window.hempConfig.apiPath + '/property/department/add',
      };
      const response = yield call(request, req);
      if (response.ok) {
        let json = yield response.json();
        if (json.code === 0) {
          yield put(submitSuccess(json));
          message.success('新增部门成功');
          window.myHistory.goBack();
        } else if (json.code === 1) {
          message.error(!json.data ? '新增部门失败' : json.data);
        }
      } else {
        yield put(submitFailed(response.status));
        message.error('新增部门失败');
      }
    }
  } catch (e) {
    yield put(submitError(e));
    message.error('系统错误');
  }
}
function* initIceList(action) {
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
        window.hempConfig.apiPath + '/ice/org/page',
        action.payload,
      ),
    };

    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      if (json.code === 0) {
        yield put(initIceListSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? 'ICE部门查询失败' : json.data);
      }
    } else {
      yield put(initIceListFailed(response.status));
      message.error('ICE部门查询失败');
    }
  } catch (e) {
    yield put(initIceListError(e));
    message.error('系统错误');
  }
}
function* initDepartmentDetail(action) {
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
        window.hempConfig.apiPath + '/property/department/' + action.payload.id,
    };
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      if (json.code === 0) {
        yield put(initDepartmentDetailSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '部门详情查询失败' : json.data);
      }
    } else {
      yield put(initDepartmentDetailFailed(response.status));
      message.error('部门详情查询失败');
    }
  } catch (e) {
    yield put(initDepartmentDetailError(e));
    message.error('系统错误');
  }
}
export default function* addDepartmentSaga() {
  yield takeEvery(ADD_DEPARTMENT, submit);
  yield takeEvery(ICE_LIST, initIceList);
  yield takeEvery(DEPARTMENT_DETAIL, initDepartmentDetail);
}
