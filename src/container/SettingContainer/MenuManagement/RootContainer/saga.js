/**
 * Created by xu.long on 2018/6/23.
 */
import { message } from 'antd';
import fetch from 'isomorphic-fetch';
import { call, put, takeEvery } from 'redux-saga/effects';
import { request } from '../../../../util/request';
import { urlGenerator } from '../../../../util/util';
import {
  initMenuListError,
  initMenuListFailed,
  initMenuListSuccess,
  modifyListStatusError,
  modifyListStatusFailed,
  modifyListStatusSuccess,
} from './action';
import { MENU_MANAGEMENT, MODIFY_LIST_STATUS } from './constant';

function* initMenuList(action) {
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
        window.hempConfig.apiPath + '/menu/list',
        action.payload,
      ),
    };
    // let param;
    // for(let item in action.payload){
    //     param = item + '=' + '&'
    // }
    // const url = urlGenerator(window.hempConfig.basePath + '/menu/list', action.payload);
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
      if (json.code === 0) {
        yield put(initMenuListSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '菜单列表查询失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initMenuListFailed(response.status));
      message.error('菜单列表查询失败');
    }
  } catch (e) {
    yield put(initMenuListError(e));
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
        menuId: action.payload.id,
        menuStatus: action.payload.status,
      }),
      url: window.hempConfig.apiPath + '/menu/modify',
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
        message.success('菜单状态修改成功');
        // window.myHistory.goBack();
      } else if (json.code === 1) {
        message.error(!json.data ? '菜单状态修改成功' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(modifyListStatusFailed(response.status));
      message.error('菜单状态修改失败');
    }
  } catch (e) {
    yield put(modifyListStatusError(e));
    message.error('系统错误');
  }
}
export default function* menuManagementSaga() {
  yield takeEvery(MENU_MANAGEMENT, initMenuList);
  yield takeEvery(MODIFY_LIST_STATUS, modifyListStatus);
}
