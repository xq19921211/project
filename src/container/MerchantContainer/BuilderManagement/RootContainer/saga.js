/**
 * Created by xu.long on 2018/6/18.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { message } from 'antd';
import { BUILDER, MODIFY_LIST_STATUS, DELETE_BUILDER } from './constant';
import {
  initBuilderListSuccess,
  initBuilderListError,
  initBuilderListFailed,
  modifyListStatusSuccess,
  modifyListStatusFailed,
  modifyListStatusError,
  deleteBuilderSuccess,
  deleteBuilderFailed,
  deleteBuilderError,
} from './action';
import { urlGenerator } from '../../../../util/util';
import { request } from '../../../../util/request';
function* initBuilderList(action) {
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
        window.hempConfig.apiPath + '/operator/list',
        action.payload,
      ),
    };
    // let param;
    // for(let item in action.payload){
    //     param = item + '=' + '&'
    // }
    // const url = urlGenerator(window.hempConfig.basePath + '/operator/list', action.payload);
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
      if (json.code === 0) {
        yield put(initBuilderListSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '保安队人员查询失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initBuilderListFailed(response.status));
      message.error('保安队人员查询失败');
    }
  } catch (e) {
    yield put(initBuilderListError(e));
    message.error('系统错误');
  }
}
function* modifyListStatus(action) {
  try {
    let fragment = '/operator/unlock';
    if (action.payload.status === 0) {
      fragment = '/operator/lock';
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
        message.success('保安队人员状态修改成功');
        // window.myHistory.goBack();
      } else if (json.code === 1) {
        message.error(!json.data ? '保安队人员状态修改失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(modifyListStatusFailed(response.status));
      message.error('保安队人员状态修改失败');
    }
  } catch (e) {
    yield put(modifyListStatusError(e));
    message.error('系统错误');
  }
}
function* deleteBuilder(action) {
  try {
    let fragment = '/operator/delete';
    const url = urlGenerator(window.hempConfig.apiPath + fragment, {
      opr_id: action.payload.id,
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
          deleteBuilderSuccess({
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
      yield put(deleteBuilderFailed(response.status));
      message.error('删除失败');
    }
  } catch (e) {
    yield put(deleteBuilderError(e));
    message.error('系统错误');
  }
}
export default function* builderSaga() {
  yield takeEvery(BUILDER, initBuilderList);
  // yield takeEvery(ROLE, initRoleList);
  yield takeEvery(MODIFY_LIST_STATUS, modifyListStatus);
  yield takeEvery(DELETE_BUILDER, deleteBuilder);
}
