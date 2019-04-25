/**
 * Created by xu.long on 2018/6/23.
 */
import { createAction, Action } from 'redux-actions';
import {
  MENU_MANAGEMENT,
  MENU_MANAGEMENT_SUCCESS,
  MENU_MANAGEMENT_ERROR,
  MENU_MANAGEMENT_FAILED,
  MODIFY_LIST_STATUS,
  MODIFY_LIST_STATUS_SUCCESS,
  MODIFY_LIST_STATUS_ERROR,
  MODIFY_LIST_STATUS_FAILED,
} from './constant';

export const initMenuList = createAction(MENU_MANAGEMENT);
export const initMenuListSuccess = createAction(MENU_MANAGEMENT_SUCCESS);
export const initMenuListError = createAction(MENU_MANAGEMENT_ERROR);
export const initMenuListFailed = createAction(MENU_MANAGEMENT_FAILED);

export const modifyListStatus = createAction(MODIFY_LIST_STATUS);
export const modifyListStatusSuccess = createAction(MODIFY_LIST_STATUS_SUCCESS);
export const modifyListStatusError = createAction(MODIFY_LIST_STATUS_ERROR);
export const modifyListStatusFailed = createAction(MODIFY_LIST_STATUS_FAILED);
