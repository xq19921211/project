/**
 * Created by xu.long on 2018/6/6.
 */
import { createAction, Action } from 'redux-actions';
import {
  MERCHANT_MEMBER_DETAIL,
  MERCHANT_MEMBER_DETAIL_SUCCESS,
  MERCHANT_MEMBER_DETAIL_ERROR,
  MERCHANT_MEMBER_DETAIL_FAILED,
  INIT,
} from './constant';

export const initMerchantMemberDetail = createAction(MERCHANT_MEMBER_DETAIL);
export const initMerchantMemberDetailSuccess = createAction(
  MERCHANT_MEMBER_DETAIL_SUCCESS,
);
export const initMerchantMemberDetailError = createAction(
  MERCHANT_MEMBER_DETAIL_ERROR,
);
export const initMerchantMemberDetailFailed = createAction(
  MERCHANT_MEMBER_DETAIL_FAILED,
);

export const init = createAction(INIT);
