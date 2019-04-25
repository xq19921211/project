/**
 * Created by xu.long on 2018/6/23.
 */
import { message } from 'antd';
import { call, put, takeEvery } from 'redux-saga/effects';
import { get, post } from '@/util/request';
import * as actions from './action';
import {
  ADD_ROLE_MENU,
  ADD_USER_ROLE,
  GET_ALL_USER_LIST,
  MODIFY_LIST_STATUS,
  ROLE_MANAGEMENT,
  GET_MENU_LIST_BY_ROLE_ID,
} from './constant';

const initRoleList = (function() {
  let preIndexAndPageSize = { current: 1, pageSize: 10 };
  return function*(action) {
    try {
      const response = yield call(
        get,
        '/role/list',
        action.payload || preIndexAndPageSize,
      );
      yield put(actions.initRoleListSuccess(response));
      preIndexAndPageSize = { ...preIndexAndPageSize, ...action.payload };
    } catch (e) {
      yield put(actions.initRoleListError(e));
      message.error(e.code ? e.message : '角色查询失败');
    }
  };
})();

function* modifyListStatus(action) {
  try {
    const response = yield call(post, '/role/modify', {
      roleId: action.payload.id,
      roleStatus: action.payload.status,
    });
    yield put(
      actions.modifyListStatusSuccess({
        json: response,
        record: action.payload,
      }),
    );
    yield put(actions.initRoleList());
    message.success('角色状态修改成功');
  } catch (e) {
    yield put(actions.modifyListStatusError(e.message));
    message.error(e.code ? e.message : '角色状态修改失败');
  }
}

function* addRoleMenu(action) {
  try {
    const response = yield call(post, '/role/addRoleMenu', action.payload);
    yield put(actions.addRoleMenuSuccess(response));
    yield put(actions.initRoleList());
    message.success('菜单添加成功');
  } catch (e) {
    yield put(actions.addRoleMenuFailed(e.message));
    message.error(e.code ? e.message : '菜单添加失败');
  }
}
function* getAllUserList(action) {
  try {
    const response = yield call(get, '/user/list', {
      allowLogin: 1,
      ...action.payload,
    });
    yield put(actions.getAllUserListSuccess(response));
  } catch (e) {
    yield put(actions.getAllUserListError(e.message));
    message.error(e.code ? e.message : '用户查询失败');
  }
}

function* addUserRole(action) {
  try {
    const response = yield call(post, '/role/addUserRole', action.payload);
    yield put(actions.addUserRoleSuccess(response));
    yield put(actions.initRoleList());
  } catch (e) {
    yield put(actions.addUserRoleError(e.message));
    message.error(e.code ? e.message : '角色分配失败');
  }
}

function* getMenuListByRoleId(action) {
  try {
    const response = yield call(
      get,
      '/role/getMenuListByRoleId/' + action.payload.id,
    );
    yield put(actions.getMenuListByRoleIdSuccess(response));
  } catch (e) {
    yield put(actions.getMenuListByRoleIdError(e.message));
    message.error(e.code ? e.message : '菜单查询失败');
  }
}
export default function* roleManagementSaga() {
  yield takeEvery(ROLE_MANAGEMENT, initRoleList);
  yield takeEvery(MODIFY_LIST_STATUS, modifyListStatus);
  yield takeEvery(ADD_ROLE_MENU, addRoleMenu);
  yield takeEvery(GET_ALL_USER_LIST, getAllUserList);
  yield takeEvery(ADD_USER_ROLE, addUserRole);
  yield takeEvery(GET_MENU_LIST_BY_ROLE_ID, getMenuListByRoleId);
}
