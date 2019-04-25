/**
 * Created by xu.long on 2018/6/23.
 */
import { createAction } from 'redux-actions';
import {
  ADD_ROLE_MENU,
  ADD_ROLE_MENU_ERROR,
  ADD_ROLE_MENU_FAILED,
  ADD_ROLE_MENU_SUCCESS,
  MODIFY_LIST_STATUS,
  MODIFY_LIST_STATUS_ERROR,
  MODIFY_LIST_STATUS_FAILED,
  MODIFY_LIST_STATUS_SUCCESS,
  ROLE_MANAGEMENT,
  ROLE_MANAGEMENT_ERROR,
  ROLE_MANAGEMENT_FAILED,
  ROLE_MANAGEMENT_SUCCESS,
} from './constant';
import * as types from './constant';

export const initRoleList = createAction(ROLE_MANAGEMENT);
export const initRoleListSuccess = createAction(ROLE_MANAGEMENT_SUCCESS);
export const initRoleListError = createAction(ROLE_MANAGEMENT_ERROR);
export const initRoleListFailed = createAction(ROLE_MANAGEMENT_FAILED);

export const modifyListStatus = createAction(MODIFY_LIST_STATUS);
export const modifyListStatusSuccess = createAction(MODIFY_LIST_STATUS_SUCCESS);
export const modifyListStatusError = createAction(MODIFY_LIST_STATUS_ERROR);
export const modifyListStatusFailed = createAction(MODIFY_LIST_STATUS_FAILED);

export const addRoleMenu = createAction(ADD_ROLE_MENU);
export const addRoleMenuSuccess = createAction(ADD_ROLE_MENU_SUCCESS);
export const addRoleMenuError = createAction(ADD_ROLE_MENU_ERROR);
export const addRoleMenuFailed = createAction(ADD_ROLE_MENU_FAILED);

export const getAllUserList = createAction(types.GET_ALL_USER_LIST);
export const getAllUserListError = createAction(types.GET_ALL_USER_LIST_ERROR);
export const getAllUserListFailed = createAction(
  types.GET_ALL_USER_LIST_FAILED,
);
export const getAllUserListSuccess = createAction(
  types.GET_ALL_USER_LIST_SUCCESS,
);

export const addUserRole = createAction(types.ADD_USER_ROLE);
export const addUserRoleError = createAction(types.ADD_USER_ROLE_ERROR);
export const addUserRoleFailed = createAction(types.ADD_USER_ROLE_FAILED);
export const addUserRoleSuccess = createAction(types.ADD_USER_ROLE_SUCCESS);

export const getMenuListByRoleId = createAction(types.GET_MENU_LIST_BY_ROLE_ID);
export const getMenuListByRoleIdSuccess = createAction(
  types.GET_MENU_LIST_BY_ROLE_ID_SUCCESS,
);
export const getMenuListByRoleIdError = createAction(
  types.GET_MENU_LIST_BY_ROLE_ID_ERROR,
);
