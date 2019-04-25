/**
 * Created by xu.long on 2018/5/26.
 */
import { createAction, Action } from 'redux-actions';
import {
  ADD_TENEMENT_MEMBER,
  ADD_TENEMENT_MEMBER_SUCCESS,
  ADD_TENEMENT_MEMBER_ERROR,
  ADD_TENEMENT_MEMBER_FAILED,
  ICE_LIST,
  ICE_LIST_SUCCESS,
  ICE_LIST_ERROR,
  ICE_LIST_FAILED,
} from './constant';

export const submit = createAction(ADD_TENEMENT_MEMBER);
export const submitSuccess = createAction(ADD_TENEMENT_MEMBER_SUCCESS);
export const submitError = createAction(ADD_TENEMENT_MEMBER_ERROR);
export const submitFailed = createAction(ADD_TENEMENT_MEMBER_FAILED);

export const initIceList = createAction(ICE_LIST);
export const initIceListSuccess = createAction(ICE_LIST_SUCCESS);
export const initIceListError = createAction(ICE_LIST_ERROR);
export const initIceListFailed = createAction(ICE_LIST_FAILED);
