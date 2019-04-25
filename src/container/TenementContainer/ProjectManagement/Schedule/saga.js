import * as actions from './action';
import * as types from './constant';

import { call, put, takeEvery } from 'redux-saga/effects';
import { get, post } from '../../../../util/request';

import { message } from 'antd';

function* getScheduleDetail(action) {
  try {
    const response = yield call(get, `/schedule/detail/${action.payload.id}`);
    yield put(actions.getScheduleDetailSuccess(response));
  } catch (e) {
    console.log(e);
    yield put(actions.getScheduleDetailError(e.message));
    message.error(e.code ? e.message : '查询施工队排班详情失败');
  }
}
function* addSchedule(action) {
  try {
    const response = yield call(post, `/schedule/add`, action.payload);
    yield put(actions.addScheduleSuccess(response));
    yield put(actions.getScheduleDetail({ id: action.payload.projectId }));
    message.success(response.message);
  } catch (e) {
    console.log(e);
    yield put(actions.addScheduleError(e.message));
    message.error(e.code ? e.message : '新增排班失败');
  }
}

export default function*() {
  yield takeEvery(types.GET_SCHEDULE_DETAIL, getScheduleDetail);
  yield takeEvery(types.ADD_SCHEDULE, addSchedule);
}
