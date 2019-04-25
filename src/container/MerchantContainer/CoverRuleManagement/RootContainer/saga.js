/**
 * Created by xu.long on 2018/6/18.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { message } from 'antd';
import {
  COVER_RULE,
  COVER_RULE_SUCCESS,
  COVER_RULE_ERROR,
  COVER_RULE_FAILED,
} from './constant';
import {
  initCoverRuleListSuccess,
  initCoverRuleListError,
  initCoverRuleListFailed,
} from './action';
import { urlGenerator } from '../../../../util/util';
import { request } from '../../../../util/request';
function* initCoverRuleList(action) {
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
        window.hempConfig.apiPath + '/coverRule/list',
        action.payload,
      ),
    };
    // let param;
    // for(let item in action.payload){
    //     param = item + '=' + '&'
    // }
    // const url = urlGenerator(window.hempConfig.basePath + '/coverRule/list', action.payload);
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
      if (json.code === 0) {
        yield put(initCoverRuleListSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '覆盖规则查询失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initCoverRuleListFailed(response.status));
      message.error('覆盖规则查询失败');
    }
  } catch (e) {
    yield put(initCoverRuleListError(e));
    message.error('系统错误');
  }
}
export default function* coverRuleSaga() {
  yield takeEvery(COVER_RULE, initCoverRuleList);
}
