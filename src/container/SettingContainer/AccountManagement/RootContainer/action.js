/**
 * Created by xu.long on 2018/5/19.
 */
import { createAction, Action } from 'redux-actions';
import {
  SETTING_MANAGEMENT,
  SETTING_MANAGEMENT_SUCCESS,
  SETTING_MANAGEMENT_ERROR,
  SETTING_MANAGEMENT_FAILED,
  MODIFY_LIST_STATUS,
  MODIFY_LIST_STATUS_SUCCESS,
  MODIFY_LIST_STATUS_FAILED,
  MODIFY_LIST_STATUS_ERROR,
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILED,
  DELETE_ACCOUNT_ERROR,
} from './constant';

export const initSettingList = createAction(SETTING_MANAGEMENT);
export const initSettingListSuccess = createAction(SETTING_MANAGEMENT_SUCCESS);
export const initSettingListError = createAction(SETTING_MANAGEMENT_ERROR);
export const initSettingListFailed = createAction(SETTING_MANAGEMENT_FAILED);

export const modifyListStatus = createAction(MODIFY_LIST_STATUS);
export const modifyListStatusSuccess = createAction(MODIFY_LIST_STATUS_SUCCESS);
export const modifyListStatusError = createAction(MODIFY_LIST_STATUS_ERROR);
export const modifyListStatusFailed = createAction(MODIFY_LIST_STATUS_FAILED);

export const deleteAccount = createAction(DELETE_ACCOUNT);
export const deleteAccountSuccess = createAction(DELETE_ACCOUNT_SUCCESS);
export const deleteAccountError = createAction(DELETE_ACCOUNT_ERROR);
export const deleteAccountFailed = createAction(DELETE_ACCOUNT_FAILED);
