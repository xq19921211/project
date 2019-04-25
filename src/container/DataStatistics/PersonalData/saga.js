import * as actions from './action';
import * as types from './constant';

import { call, put, takeEvery } from 'redux-saga/effects';
import { get, post } from '@/util/request';

import { message } from 'antd';

function* getOperatorAllDataReport(action) {
  try {
    const response = yield call(post, `/operator/allDataReport`, {
      ...action.payload,
    });
    yield put(actions.getOperatorAllDataReportSuccess(response));
  } catch (e) {
    console.log(e);
    yield put(actions.getOperatorIncomeError(e.message));
    message.error(e.code ? e.message : '查询个人信息失败');
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
    message.error(e.code ? e.message : '查询个人订单画像失败');
  }
}
function* getOperatorIncome(action) {
  try {
    const response = yield call(post, `/operator/income`, {
      ...action.payload,
    });
    yield put(actions.getOperatorIncomeSuccess(response));
  } catch (e) {
    console.log(e);
    yield put(actions.getOperatorIncomeError(e.message));
    message.error(e.code ? e.message : '查询个人收入画像失败');
  }
}

export default function*() {
  yield takeEvery(types.GET_OPERATOR_ALL_DATA_REPORT, getOperatorAllDataReport);
  yield takeEvery(types.GET_OPERATOR_ANALYSIS, getOperatorAnalysis);
  yield takeEvery(types.GET_OPERATOR_INCOME, getOperatorIncome);
}
