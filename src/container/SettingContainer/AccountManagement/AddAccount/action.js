/**
 * Created by xu.long on 2018/5/29.
 */
import { createAction, Action } from 'redux-actions';
import {
  ADD_ACCOUNT,
  ADD_ACCOUNT_SUCCESS,
  ADD_ACCOUNT_FAILED,
  ADD_ACCOUNT_ERROR,
  ICE_LIST,
  ICE_LIST_SUCCESS,
  ICE_LIST_FAILED,
  ICE_LIST_ERROR,
} from './constant';

export const submit = createAction(ADD_ACCOUNT);
export const submitSuccess = createAction(ADD_ACCOUNT_SUCCESS);
export const submitError = createAction(ADD_ACCOUNT_ERROR);
export const submitFailed = createAction(ADD_ACCOUNT_FAILED);

export const initIceList = createAction(ICE_LIST);
export const initIceListSuccess = createAction(ICE_LIST_SUCCESS);
export const initIceListError = createAction(ICE_LIST_ERROR);
export const initIceListFailed = createAction(ICE_LIST_FAILED);
