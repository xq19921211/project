/**
 * Created by xu.long on 2018/5/26.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { message } from 'antd';
import {
  TENEMENT_MEMBER_DETAIL,
  TENEMENT_MEMBER_DETAIL_SUCCESS,
  TENEMENT_MEMBER_DETAIL_ERROR,
  TENEMENT_MEMBER_DETAIL_FAILED,
} from './constant';
import {
  initTenementMemberDetailSuccess,
  initTenementMemberDetailFailed,
  initTenementMemberDetailError,
} from './action';
import { urlGenerator } from '../../../../util/util';
import { request } from '../../../../util/request';
function* initTenementMemberDetail(action) {
  try {
    const req = {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      url: window.hempConfig.apiPath + '/customer/' + action.payload.id,
    };
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
      if (json.code === 0) {
        yield put(initTenementMemberDetailSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '物业人员详情查询失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initTenementMemberDetailFailed(response.status));
      message.error('物业人员详情查询失败');
    }
  } catch (e) {
    yield put(initTenementMemberDetailError(e));
    message.error('系统错误');
  }
}
export default function* tenementMemberDetailSaga() {
  yield takeEvery(TENEMENT_MEMBER_DETAIL, initTenementMemberDetail);
}
