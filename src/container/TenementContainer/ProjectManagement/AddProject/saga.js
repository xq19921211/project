import * as actions from './action';
import * as types from './constant';

import { call, put, takeEvery } from 'redux-saga/effects';
import { get, post } from '../../../../util/request';

import { message } from 'antd';

function* submit(action) {
  try {
    const url =
      action.payload.action === 'edit' ? '/project/modify' : '/project/add';
    const response = yield call(post, url, action.payload);
    yield put(actions.submitSuccess(response));
    message.success(response.message);
    window.myHistory.goBack();
  } catch (e) {
    console.log(e);
    yield put(actions.submitError(e.message));
    message.error(
      e.code
        ? e.message
        : action.payload.action === 'edit'
          ? '编辑项目失败'
          : '新增项目失败',
    );
  }
}

export default function* addProjectSaga() {
  yield takeEvery(types.ADD_PROJECT, submit);
}
