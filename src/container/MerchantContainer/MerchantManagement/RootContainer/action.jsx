/**
 * Created by xu.long on 2018/5/18.
 */
import { createAction, Action } from 'redux-actions';
import {
  MERCHANT_MANAGEMENT,
  MERCHANT_MANAGEMENT_SUCCESS,
  MERCHANT_MANAGEMENT_ERROR,
  MERCHANT_MANAGEMENT_FAILED,
  MODIFY_LIST_STATUS,
  MODIFY_LIST_STATUS_SUCCESS,
  MODIFY_LIST_STATUS_ERROR,
  MODIFY_LIST_STATUS_FAILED,
} from './constant';

export const initMerchantList = createAction(MERCHANT_MANAGEMENT);
export const initMerchantListSuccess = createAction(
  MERCHANT_MANAGEMENT_SUCCESS,
);
export const initMerchantListError = createAction(MERCHANT_MANAGEMENT_ERROR);
export const initMerchantListFailed = createAction(MERCHANT_MANAGEMENT_FAILED);

export const modifyListStatus = createAction(MODIFY_LIST_STATUS);
export const modifyListStatusSuccess = createAction(MODIFY_LIST_STATUS_SUCCESS);
export const modifyListStatusError = createAction(MODIFY_LIST_STATUS_ERROR);
export const modifyListStatusFailed = createAction(MODIFY_LIST_STATUS_FAILED);
