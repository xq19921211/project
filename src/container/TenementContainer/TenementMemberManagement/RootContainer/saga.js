/**
 * Created by xu.long on 2018/5/19.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { message } from 'antd';
import {
  TENEMENT_MEMBER,
  TENEMENT_MEMBER_SUCCESS,
  TENEMENT_MEMBER_ERROR,
  TENEMENT_MEMBER_FAILED,
  MODIFY_LIST_STATUS,
  MODIFY_LIST_STATUS_SUCCESS,
  MODIFY_LIST_STATUS_ERROR,
  MODIFY_LIST_STATUS_FAILED,
  DELETE_TENEMENT_MEMBER,
  DELETE_TENEMENT_MEMBER_SUCCESS,
  DELETE_TENEMENT_MEMBER_ERROR,
  DELETE_TENEMENT_MEMBER_FAILED,
} from './constant';
import {
  initTenementMemberListSuccess,
  initTenementMemberListError,
  initTenementMemberListFailed,
  modifyListStatusSuccess,
  modifyListStatusError,
  modifyListStatusFailed,
  deleteTenementMemberSuccess,
  deleteTenementMemberError,
  deleteTenementMemberFailed,
} from './action';
import { urlGenerator } from '../../../../util/util';
import { request } from '../../../../util/request';
function* initTenementMemberList(action) {
  try {
    const url = urlGenerator(
      window.hempConfig.apiPath + '/customer/list',
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
        yield put(initTenementMemberListSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '物业人员查询失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initTenementMemberListFailed(response.status));
      message.error('物业人员查询失败');
    }
  } catch (e) {
    yield put(initTenementMemberListError(e));
    message.error('系统错误');
  }
}
function* modifyListStatus(action) {
  try {
    let fragment = '/customer/unlock';
    if (action.payload.status === 0) {
      fragment = '/customer/lock';
    }
    const url = urlGenerator(window.hempConfig.apiPath + fragment, {
      id: action.payload.id,
    });
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
        yield put(
          modifyListStatusSuccess({
            json: json,
            record: action.payload,
          }),
        );
        message.success('物业人员状态修改成功');
        // window.myHistory.goBack();
      } else if (json.code === 1) {
        message.error(!json.data ? '物业人员状态修改失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(modifyListStatusFailed(response.status));
      message.error('物业人员状态修改失败');
    }
  } catch (e) {
    yield put(modifyListStatusError(e));
    message.error('系统错误');
  }
}

function* deleteTenementMember(action) {
  try {
    let fragment = '/customer/delete';
    const url = urlGenerator(window.hempConfig.apiPath + fragment, {
      id: action.payload.id,
    });
    const req = {
      method: 'DELETE',
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
        yield put(
          deleteTenementMemberSuccess({
            json: json,
            record: action.payload,
          }),
        );
        message.success('删除成功');
        // window.myHistory.goBack();
      } else if (json.code === 1) {
        message.error(!json.data ? '删除失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(deleteTenementMemberFailed(response.status));
      message.error('删除失败');
    }
  } catch (e) {
    yield put(deleteTenementMemberError(e));
    message.error('系统错误');
  }
}
export default function* tenementMemberSaga() {
  yield takeEvery(TENEMENT_MEMBER, initTenementMemberList);
  yield takeEvery(MODIFY_LIST_STATUS, modifyListStatus);
  yield takeEvery(DELETE_TENEMENT_MEMBER, deleteTenementMember);
}
