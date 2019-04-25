/**
 * Created by xu.long on 2018/5/16.
 */

import { message } from 'antd';
import { call, put, takeEvery } from 'redux-saga/effects';

import { get } from '../../../../util/request';
import * as actions from './action';
import * as types from './constant';

function* initProjectList(action) {
  try {
    const response = yield call(get, '/project/list', action.payload);
    yield put(actions.initProjectListSuccess(response));
  } catch (e) {
    yield put(actions.initProjectListError(e));
    message.error('系统错误');
  }
}

function* projectDel(action) {
  try {
    yield call(get, `/project/delete/${action.payload.id}`);
    message.success('删除项目成功');
    yield put(actions.projectDelSuccess());
    yield put(
      actions.initProjectList({
        current: action.payload.current,
        pageSize: action.payload.pageSize,
      }),
    );
  } catch (e) {
    yield put(actions.projectDelFailed(e));
    message.error('删除项目失败');
  }
}

export default function* projectManagementSaga() {
  yield takeEvery(types.PROJECT_MANAGEMENT, initProjectList);
  yield takeEvery(types.PROJECT_DEL, projectDel);
}
