/**
 * Created by xu.long on 2018/6/18.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { message } from 'antd';
import { BUILD_TEAM_MANAGEMENT, MODIFY_LIST_STATUS } from './constant';
import {
  initBuildTeamListSuccess,
  initBuildTeamListError,
  initBuildTeamListFailed,
  modifyListStatusSuccess,
  modifyListStatusError,
  modifyListStatusFailed,
} from './action';
import { urlGenerator } from '../../../../util/util';
import { request } from '../../../../util/request';
function* initBuildTeamList(action) {
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
        window.hempConfig.apiPath + '/team/list',
        action.payload,
      ),
    };
    // let param;
    // for(let item in action.payload){
    //     param = item + '=' + '&'
    // }
    // const url = urlGenerator(window.hempConfig.basePath + '/team/list', action.payload);
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});

      if (json.code === 0) {
        yield put(initBuildTeamListSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '保安队查询失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initBuildTeamListFailed(response.status));
      message.error('保安队查询失败');
    }
  } catch (e) {
    yield put(initBuildTeamListError(e));
    message.error('系统错误');
  }
}
function* modifyListStatus(action) {
  try {
    let fragment = '/team/unlock';
    if (action.payload.status === 0) {
      fragment = '/team/lock';
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
        message.success('保安队状态修改成功');
        // window.myHistory.goBack();
      } else if (json.code === 1) {
        message.error(!json.data ? '保安队状态修改成功' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(modifyListStatusFailed(response.status));
      message.error('保安队状态修改失败');
    }
  } catch (e) {
    yield put(modifyListStatusError(e));
    message.error('系统错误');
  }
}
export default function* buildTeamSaga() {
  yield takeEvery(BUILD_TEAM_MANAGEMENT, initBuildTeamList);
  yield takeEvery(MODIFY_LIST_STATUS, modifyListStatus);
}
