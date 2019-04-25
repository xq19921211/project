/**
 * Created by xu.long on 2018/6/23.
 */
import { message } from 'antd';
import { call, put, takeEvery } from 'redux-saga/effects';
import { get, post } from '../../../../util/request';

import * as actions from './action';
import { HOME_PICTURE_MANAGEMENT, MODIFY_LIST_STATUS } from './constant';

const initHomePictureList = (function() {
  let preIndexAndPageSize = { current: 1, pageSize: 10 };
  return function*(action) {
    try {
      const response = yield call(
        get,
        '/h5banner/list',
        action.payload || preIndexAndPageSize,
      );
      yield put(actions.initHomePictureListSuccess(response));
      preIndexAndPageSize = { ...preIndexAndPageSize, ...action.payload };
    } catch (e) {
      yield put(actions.initHomePictureListError(e));
      message.error(e.code ? e.message : '首页轮播图查询失败');
    }
  };
})();

function* modifyListStatus(action) {
  try {
    const response = yield call(post, '/h5banner/modify', {
      id: action.payload.id,
      status: action.payload.status,
    });
    yield put(
      actions.modifyListStatusSuccess({
        json: response,
        record: action.payload,
      }),
    );
    yield put(actions.initHomePictureList());
    message.success('首页轮播图状态修改成功');
  } catch (e) {
    yield put(actions.modifyListStatusError(e));
    message.error(e.code ? e.message : '首页轮播图状态修改失败');
  }
}
export default function* homePictureManagementSaga() {
  yield takeEvery(HOME_PICTURE_MANAGEMENT, initHomePictureList);
  yield takeEvery(MODIFY_LIST_STATUS, modifyListStatus);
}
