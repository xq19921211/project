/**
 * Created by xu.long on 2018/5/26.
 */
import { createAction, Action } from 'redux-actions';
import {
  TENEMENT_MEMBER_DETAIL,
  TENEMENT_MEMBER_DETAIL_SUCCESS,
  TENEMENT_MEMBER_DETAIL_ERROR,
  TENEMENT_MEMBER_DETAIL_FAILED,
  INIT,
} from './constant';

export const initTenementMemberDetail = createAction(TENEMENT_MEMBER_DETAIL);
export const initTenementMemberDetailSuccess = createAction(
  TENEMENT_MEMBER_DETAIL_SUCCESS,
);
export const initTenementMemberDetailError = createAction(
  TENEMENT_MEMBER_DETAIL_ERROR,
);
export const initTenementMemberDetailFailed = createAction(
  TENEMENT_MEMBER_DETAIL_FAILED,
);

export const init = createAction(INIT);
