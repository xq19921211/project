/**
 * Created by xu.long on 2018/5/18.
 */
import { createAction, Action } from 'redux-actions';
import {
  MERCHANT_MEMBER,
  MERCHANT_MEMBER_SUCCESS,
  MERCHANT_MEMBER_ERROR,
  MERCHANT_MEMBER_FAILED,
  // ROLE,
  // ROLE_SUCCESS,
  // ROLE_ERROR,
  // ROLE_FAILED
  MODIFY_LIST_STATUS,
  MODIFY_LIST_STATUS_SUCCESS,
  MODIFY_LIST_STATUS_FAILED,
  MODIFY_LIST_STATUS_ERROR,

  DELETE_MERCHANTMEMBER,
  DELETE_MERCHANTMEMBER_SUCCESS,
  DELETE_MERCHANTMEMBER_FAILED,
  DELETE_MERCHANTMEMBER_ERROR,
} from './constant';

export const initMerchantMemberList = createAction(MERCHANT_MEMBER);
export const initMerchantMemberListSuccess = createAction(
  MERCHANT_MEMBER_SUCCESS,
);
export const initMerchantMemberListError = createAction(MERCHANT_MEMBER_ERROR);
export const initMerchantMemberListFailed = createAction(
  MERCHANT_MEMBER_FAILED,
);

// export const initRoleList = createAction(ROLE);
// export const initRoleListSuccess = createAction(ROLE_SUCCESS);
// export const initRoleListError = createAction(ROLE_ERROR);
// export const initRoleListFailed = createAction(ROLE_FAILED);

export const modifyListStatus = createAction(MODIFY_LIST_STATUS);
export const modifyListStatusSuccess = createAction(MODIFY_LIST_STATUS_SUCCESS);
export const modifyListStatusError = createAction(MODIFY_LIST_STATUS_ERROR);
export const modifyListStatusFailed = createAction(MODIFY_LIST_STATUS_FAILED);

export const deletemerchantmember = createAction(DELETE_MERCHANTMEMBER);
export const deletemerchantmemberSuccess = createAction(DELETE_MERCHANTMEMBER_SUCCESS);
export const deletemerchantmemberError = createAction(DELETE_MERCHANTMEMBER_ERROR);
export const deletemerchantmemberFailed = createAction(DELETE_MERCHANTMEMBER_FAILED);
