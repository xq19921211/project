/**
 * Created by xu.long on 2018/5/19.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { message } from 'antd';
import {
  SETTING_MANAGEMENT,
  SETTING_MANAGEMENT_SUCCESS,
  SETTING_MANAGEMENT_ERROR,
  SETTING_MANAGEMENT_FAILED,
  MODIFY_LIST_STATUS,
  DELETE_ACCOUNT,
} from './constant';
import {
  initSettingListSuccess,
  initSettingListError,
  initSettingListFailed,
  modifyListStatusSuccess,
  modifyListStatusFailed,
  modifyListStatusError,
  deleteAccountSuccess,
  deleteAccountError,
  deleteAccountFailed
} from './action';
import { urlGenerator } from '../../../../util/util';
import { request } from '../../../../util/request';
function* initSettingList(action) {
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
        window.hempConfig.apiPath + '/manager/list',
        action.payload,
      ),
    };
    // let param;
    // for(let item in action.payload){
    //     param = item + '=' + '&'
    // }
    // const url = urlGenerator(window.hempConfig.basePath + '/manager/list', action.payload);
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
      if (json.code === 0) {
        yield put(initSettingListSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '账号查询失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initSettingListFailed(response.status));
      message.error('账号查询失败');
    }
  } catch (e) {
    yield put(initSettingListError(e));
    message.error('系统错误');
  }
}
function* modifyListStatus(action) {
  try {
    let fragment = '/manager/unlock';
    if (action.payload.status === 0) {
      fragment = '/manager/lock';
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
        message.success('账号状态修改成功');
        // window.myHistory.goBack();
      } else if (json.code === 1) {
        message.error(!json.data ? '账号状态修改失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(modifyListStatusFailed(response.status));
      message.error('账号状态修改失败');
    }
  } catch (e) {
    yield put(modifyListStatusError(e));
    message.error('系统错误');
  }
}
function* deleteAccount(action) {
  try {
    let fragment = '/manager/delete';
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
          deleteAccountSuccess({
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
      yield put(deleteAccountFailed(response.status));
      message.error('删除失败');
    }
  } catch (e) {
    yield put(deleteAccountError(e));
    message.error('系统错误');
  }
}
export default function* settingManagementSaga() {
  yield takeEvery(SETTING_MANAGEMENT, initSettingList);
  yield takeEvery(MODIFY_LIST_STATUS, modifyListStatus);
  yield takeEvery(DELETE_ACCOUNT, deleteAccount);
}
