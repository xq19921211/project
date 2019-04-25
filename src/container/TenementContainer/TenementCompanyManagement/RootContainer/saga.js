/**
 * Created by xu.long on 2018/5/26.
 */
import { message } from 'antd';
import { call, put, takeEvery } from 'redux-saga/effects';
import { request } from '../../../../util/request';
import { urlGenerator } from '../../../../util/util';
import {
  initTenementCompanyListError,
  initTenementCompanyListFailed,
  initTenementCompanyListSuccess,
} from './action';
import { TENEMENT_COMPANY_MANAGEMENT } from './constant';

function* initTenementCompanyList(action) {
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
        window.hempConfig.apiPath + '/property/company/list',
        action.payload,
      ),
    };
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();

      if (json.code === 0) {
        yield put(initTenementCompanyListSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '物业公司查询失败' : json.data);
      }
    } else {
      yield put(initTenementCompanyListFailed(response.status));
      message.error('物业公司查询失败');
    }
  } catch (e) {
    yield put(initTenementCompanyListError(e));
    message.error('系统错误');
  }
}
export default function* tenementCompanySaga() {
  yield takeEvery(TENEMENT_COMPANY_MANAGEMENT, initTenementCompanyList);
}
