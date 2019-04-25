/**
 * Created by xu.long on 2018/6/5.
 */
import { Action, createAction } from 'redux-actions';
import {
  ADD_TENEMENT,
  ADD_TENEMENT_ERROR,
  ADD_TENEMENT_FAILED,
  ADD_TENEMENT_SUCCESS,
  INIT,
  TENEMENT_DETAIL,
  TENEMENT_DETAIL_ERROR,
  TENEMENT_DETAIL_FAILED,
  TENEMENT_DETAIL_SUCCESS,
} from './constant';

export const submit = createAction(ADD_TENEMENT);
export const submitSuccess = createAction(ADD_TENEMENT_SUCCESS);
export const submitError = createAction(ADD_TENEMENT_ERROR);
export const submitFailed = createAction(ADD_TENEMENT_FAILED);

export const init = createAction(INIT);

export const initTenementDetail = createAction(TENEMENT_DETAIL);
export const initTenementDetailSuccess = createAction(TENEMENT_DETAIL_SUCCESS);
export const initTenementDetailError = createAction(TENEMENT_DETAIL_ERROR);
export const initTenementDetailFailed = createAction(TENEMENT_DETAIL_FAILED);
