/**
 * Created by xu.long on 2018/6/23.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { message } from 'antd';
import {
  LOG_RECORD,
  LOG_RECORD_SUCCESS,
  LOG_RECORD_ERROR,
  LOG_RECORD_FAILED,
} from './constant';
import {
  initLogRecordListSuccess,
  initLogRecordListError,
  initLogRecordListFailed,
} from './action';
import { urlGenerator } from '../../../../util/util';
import { request } from '../../../../util/request';
function* initOperateLogRecordList(action) {
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
        window.hempConfig.apiPath + '/log/operate/list',
        action.payload,
      ),
    };
    // let param;
    // for(let item in action.payload){
    //     param = item + '=' + '&'
    // }
    // const url = urlGenerator(window.hempConfig.basePath + '/log/operate/list', action.payload);
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
      if (json.code === 0) {
        yield put(initLogRecordListSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '日志记录查询失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initLogRecordListFailed(response.status));
      message.error('日志记录查询失败');
    }
  } catch (e) {
    yield put(initLogRecordListError(e));
    message.error('系统错误');
  }
}
export default function* operateLogRecordSaga() {
  yield takeEvery(LOG_RECORD, initOperateLogRecordList);
}
