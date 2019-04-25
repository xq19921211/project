/**
 * Created by xu.long on 2018/6/9.
 */
import { createAction, Action } from 'redux-actions';
import {
  ADD_MERCHANT_MEMBER,
  ADD_MERCHANT_MEMBER_SUCCESS,
  ADD_MERCHANT_MEMBER_ERROR,
  ADD_MERCHANT_MEMBER_FAILED,
} from './constant';

export const submit = createAction(ADD_MERCHANT_MEMBER);
export const submitSuccess = createAction(ADD_MERCHANT_MEMBER_SUCCESS);
export const submitError = createAction(ADD_MERCHANT_MEMBER_ERROR);
export const submitFailed = createAction(ADD_MERCHANT_MEMBER_FAILED);
