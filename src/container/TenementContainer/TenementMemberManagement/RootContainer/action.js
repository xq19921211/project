/**
 * Created by xu.long on 2018/5/19.
 */
import { createAction, Action } from 'redux-actions';
import {
  TENEMENT_MEMBER,
  TENEMENT_MEMBER_SUCCESS,
  TENEMENT_MEMBER_ERROR,
  TENEMENT_MEMBER_FAILED,
  MODIFY_LIST_STATUS,
  MODIFY_LIST_STATUS_SUCCESS,
  MODIFY_LIST_STATUS_ERROR,
  MODIFY_LIST_STATUS_FAILED,
  DELETE_TENEMENT_MEMBER,
  DELETE_TENEMENT_MEMBER_SUCCESS,
  DELETE_TENEMENT_MEMBER_ERROR,
  DELETE_TENEMENT_MEMBER_FAILED,
} from './constant';

export const initTenementMemberList = createAction(TENEMENT_MEMBER);
export const initTenementMemberListSuccess = createAction(
  TENEMENT_MEMBER_SUCCESS,
);
export const initTenementMemberListError = createAction(TENEMENT_MEMBER_ERROR);
export const initTenementMemberListFailed = createAction(
  TENEMENT_MEMBER_FAILED,
);

export const modifyListStatus = createAction(MODIFY_LIST_STATUS);
export const modifyListStatusSuccess = createAction(MODIFY_LIST_STATUS_SUCCESS);
export const modifyListStatusError = createAction(MODIFY_LIST_STATUS_ERROR);
export const modifyListStatusFailed = createAction(MODIFY_LIST_STATUS_FAILED);

export const deleteTenementMember = createAction(DELETE_TENEMENT_MEMBER);
export const deleteTenementMemberSuccess = createAction(DELETE_TENEMENT_MEMBER_SUCCESS);
export const deleteTenementMemberError = createAction(DELETE_TENEMENT_MEMBER_ERROR);
export const deleteTenementMemberFailed = createAction(DELETE_TENEMENT_MEMBER_FAILED);
