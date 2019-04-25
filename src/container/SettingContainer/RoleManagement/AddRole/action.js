/**
 * Created by xu.long on 2018/6/23.
 */
import { createAction, Action } from 'redux-actions';
import {
  ADD_ROLE,
  ADD_ROLE_SUCCESS,
  ADD_ROLE_ERROR,
  ADD_ROLE_FAILED,
  ROLE_DETAIL,
  ROLE_DETAIL_SUCCESS,
  ROLE_DETAIL_ERROR,
  ROLE_DETAIL_FAILED,
  INIT,
} from './constant';

export const submit = createAction(ADD_ROLE);
export const submitSuccess = createAction(ADD_ROLE_SUCCESS);
export const submitError = createAction(ADD_ROLE_ERROR);
export const submitFailed = createAction(ADD_ROLE_FAILED);

export const initRoleDetail = createAction(ROLE_DETAIL);
export const initRoleDetailSuccess = createAction(ROLE_DETAIL_SUCCESS);
export const initRoleDetailError = createAction(ROLE_DETAIL_ERROR);
export const initRoleDetailFailed = createAction(ROLE_DETAIL_FAILED);

export const init = createAction(INIT);
