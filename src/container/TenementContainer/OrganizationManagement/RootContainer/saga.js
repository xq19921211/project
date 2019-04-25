/**
 * Created by xu.long on 2018/5/19.
 */
import { message } from 'antd';
import { call, put, takeEvery } from 'redux-saga/effects';
import { request } from '../../../../util/request';
import { urlGenerator } from '../../../../util/util';
import {
  initOrganizationListError,
  initOrganizationListFailed,
  initOrganizationListSuccess,
} from './action';
import { ORGANIZATION_MANAGEMENT } from './constant';

function* initOrganizationList(action) {
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
        window.hempConfig.apiPath + '/property/department/list',
        action.payload,
      ),
    };

    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      if (json.code === 0) {
        yield put(initOrganizationListSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '组织查询失败' : json.data);
      }
    } else {
      yield put(initOrganizationListFailed(response.status));
      message.error('组织查询失败');
    }
  } catch (e) {
    yield put(initOrganizationListError(e));
    message.error('系统错误');
  }
}
export default function* organizationSaga() {
  yield takeEvery(ORGANIZATION_MANAGEMENT, initOrganizationList);
}
