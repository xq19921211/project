/**
 * Created by xu.long on 2018/5/27.
 */

import {
  ADD_MERCHANT,
  ADD_MERCHANT_ERROR,
  ADD_MERCHANT_FAILED,
  ADD_MERCHANT_SUCCESS,
  INIT,
  MERCHANT_DETAIL,
  MERCHANT_DETAIL_ERROR,
  MERCHANT_DETAIL_FAILED,
  MERCHANT_DETAIL_SUCCESS,
} from './constant';

import { createAction } from 'redux-actions';

export const submit = createAction(ADD_MERCHANT);
export const submitSuccess = createAction(ADD_MERCHANT_SUCCESS);
export const submitError = createAction(ADD_MERCHANT_ERROR);
export const submitFailed = createAction(ADD_MERCHANT_FAILED);

export const init = createAction(INIT);

export const initMerchantDetail = createAction(MERCHANT_DETAIL);
export const initMerchantDetailSuccess = createAction(MERCHANT_DETAIL_SUCCESS);
export const initMerchantDetailError = createAction(MERCHANT_DETAIL_ERROR);
export const initMerchantDetailFailed = createAction(MERCHANT_DETAIL_FAILED);
