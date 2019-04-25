import { get, post } from '@/util/request';
import { message } from 'antd';
import { call, put, takeEvery } from 'redux-saga/effects';

import * as actions from './action';
import * as types from './constant';

function* getProjectInfo(action) {
  try {
    const response = yield call(post, `/project/data/getProjectInfo`, {
      ...action.payload,
    });
    yield put(actions.getProjectInfoSuccess(response));
  } catch (e) {
    console.log(e);
    yield put(actions.getProjectInfoError(e.message));
    message.error(e.code ? e.message : '查询项目基本信息失败');
  }
}
function* getProjectData(action) {
  try {
    const response = yield call(post, `/project/data/getProjectData`, {
      ...action.payload,
    });
    yield put(actions.getProjectDataSuccess(response));
  } catch (e) {
    console.log(e);
    yield put(actions.getProjectDataError(e.message));
    message.error(e.code ? e.message : '查询项目数据简报失败');
  }
}

function* getOperatorAnalysis(action) {
  try {
    const response = yield call(post, `/operator/analysis`, {
      ...action.payload,
    });
    yield put(actions.getOperatorAnalysisSuccess(response));
  } catch (e) {
    console.log(e);
    yield put(actions.getOperatorAnalysisError(e.message));
    message.error(e.code ? e.message : '查询项目订单画像失败');
  }
}

export default function*() {
  yield takeEvery(types.GET_PROJECT_INFO, getProjectInfo);
  yield takeEvery(types.GET_PROJECT_DATA, getProjectData);
  yield takeEvery(types.GET_OPERATOR_ANALYSIS, getOperatorAnalysis);
}
