/**
 * Created by xu.long on 2018/6/23.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import { message } from 'antd';
import { ADD_MENU, MENU_DETAIL } from './constant';
import {
  submitSuccess,
  submitError,
  submitFailed,
  initMenuDetailSuccess,
  initMenuDetailFailed,
  initMenuDetailError,
} from './action';
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
        body: JSON.stringify({
          menuId: action.payload.menuId,
          menuPid: action.payload.menuPid,
          menuName: action.payload.menuName,
          menuUrl: action.payload.menuUrl,
          menuSort: action.payload.menuSort,
          menuStatus: action.payload.menuStatus,
        }),
        url: window.hempConfig.apiPath + '/menu/modify',
      };
      const response = yield call(request, req);
      if (response.ok) {
        let json = yield response.json();
        if (json.code === 0) {
          yield put(submitSuccess(json));
          message.success('编辑菜单成功');
          window.myHistory.goBack();
        } else if (json.code === 1) {
          message.error(!json.data ? '编辑菜单失败' : json.data);
        }
      } else {
        yield put(submitFailed(response.status));
        message.error('编辑菜单失败');
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
        url: window.hempConfig.apiPath + '/menu/add',
      };
      const response = yield call(request, req);
      if (response.ok) {
        let json = yield response.json();
        if (json.code === 0) {
          yield put(submitSuccess(json));
          message.success('新增菜单成功');
          window.myHistory.goBack();
        } else if (json.code === 1) {
          message.error(!json.data ? '新增菜单失败' : json.data);
        }
      } else {
        yield put(submitFailed(response.status));
        message.error('新增菜单失败');
      }
    }
  } catch (e) {
    yield put(submitError(e));
    message.error('系统错误');
  }
}
function* initMenuDetail(action) {
  try {
    const req = {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      url: window.hempConfig.apiPath + '/menu/detail/' + action.payload.id,
    };
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();

      if (json.code === 0) {
        yield put(initMenuDetailSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '菜单详情查询失败' : json.data);
      }
    } else {
      yield put(initMenuDetailFailed(response.status));
      message.error('菜单详情查询失败');
    }
  } catch (e) {
    yield put(initMenuDetailError(e));
    message.error('系统错误');
  }
}
export default function* addMenuSaga() {
  yield takeEvery(ADD_MENU, submit);
  yield takeEvery(MENU_DETAIL, initMenuDetail);
}
