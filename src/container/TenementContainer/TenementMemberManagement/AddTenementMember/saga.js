/**
 * Created by xu.long on 2018/5/25.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { message } from 'antd';
import { ADD_TENEMENT_MEMBER, ICE_LIST } from './constant';
import {
  submitSuccess,
  submitError,
  submitFailed,
  initIceListSuccess,
  initIceListFailed,
  initIceListError,
} from './action';
import { urlGenerator } from '../../../../util/util';
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
        body: JSON.stringify(action.payload),
        url: window.hempConfig.apiPath + '/customer/edit',
      };
      const response = yield call(request, req);
      if (response.ok) {
        let json = yield response.json();
        // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
        if (json.code === 0) {
          yield put(submitSuccess(json));
          message.success('编辑物业人员成功');
          window.myHistory.goBack();
        } else if (json.code === 1) {
          message.error(!json.data ? '编辑物业人员失败' : json.data);
        }
      } else {
        // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
        yield put(submitFailed(response.status));
        message.error('编辑物业人员失败');
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
        url: window.hempConfig.apiPath + '/customer/add',
      };
      const response = yield call(request, req);
      if (response.ok) {
        let json = yield response.json();
        // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
        if (json.code === 0) {
          yield put(submitSuccess(json));
          message.success('新增物业人员成功');
          window.myHistory.goBack();
        } else if (json.code === 1) {
          message.error(!json.data ? '新增物业人员失败' : json.data);
        }
      } else {
        // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
        yield put(submitFailed(response.status));
        message.error('新增物业人员失败');
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
        window.hempConfig.apiPath + '/ice/account/page',
        action.payload,
      ),
    };
    // let param;
    // for(let item in action.payload){
    //     param = item + '=' + '&'
    // }
    // const url = urlGenerator(window.hempConfig.basePath + '/ice/account/page', action.payload);
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});

      if (json.code === 0) {
        yield put(initIceListSuccess(json));
      } else if (json.code === 1) {
        // message.error(!json.data ? 'ICE人员查询失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initIceListFailed(response.status));
      // message.error('ICE人员查询失败');
    }
  } catch (e) {
    yield put(initIceListError(e));
    message.error('系统错误');
  }
}
export default function* addTenementMemberSaga() {
  yield takeEvery(ADD_TENEMENT_MEMBER, submit);
  yield takeEvery(ICE_LIST, initIceList);
}
