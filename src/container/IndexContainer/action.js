/**
 * Created by xu.long on 26/03/2018.
 */

import { Action, createAction } from 'redux-actions';
import {
  GET_MENU_LIST,
  GET_MENU_LIST_ERROR,
  GET_MENU_LIST_FAILED,
  GET_MENU_LIST_SUCCESS,
  GET_USER_INFO,
  GET_USER_INFO_ERROR,
  GET_USER_INFO_FAILED,
  GET_USER_INFO_SUCCESS,
  MODIFY_PASSWORD,
  MODIFY_PASSWORD_ERROR,
  MODIFY_PASSWORD_SUCCESS,
} from './constant';

export const initMenuList = createAction(GET_MENU_LIST);
export const initMenuListSuccess = createAction(GET_MENU_LIST_SUCCESS);
export const initMenuListError = createAction(GET_MENU_LIST_ERROR);
export const initMenuListFailed = createAction(GET_MENU_LIST_FAILED);

export const initUserInfo = createAction(GET_USER_INFO);
export const initUserInfoSuccess = createAction(GET_USER_INFO_SUCCESS);
export const initUserInfoError = createAction(GET_USER_INFO_ERROR);
export const initUserInfoFailed = createAction(GET_USER_INFO_FAILED);

export const modifyPassword = createAction(MODIFY_PASSWORD);
export const modifyPasswordSuccess = createAction(MODIFY_PASSWORD_SUCCESS);
export const modifyPasswordError = createAction(MODIFY_PASSWORD_ERROR);
