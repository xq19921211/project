/**
 * Created by xu.long on 2018/5/25.
 */
import { createAction } from 'redux-actions';
import {
  ADD_DEPARTMENT,
  ADD_DEPARTMENT_ERROR,
  ADD_DEPARTMENT_FAILED,
  ADD_DEPARTMENT_SUCCESS,
  DEPARTMENT_DETAIL,
  DEPARTMENT_DETAIL_ERROR,
  DEPARTMENT_DETAIL_FAILED,
  DEPARTMENT_DETAIL_SUCCESS,
  ICE_LIST,
  ICE_LIST_ERROR,
  ICE_LIST_FAILED,
  ICE_LIST_SUCCESS,
  INIT,
} from './constant';

export const submit = createAction(ADD_DEPARTMENT);
export const submitSuccess = createAction(ADD_DEPARTMENT_SUCCESS);
export const submitError = createAction(ADD_DEPARTMENT_ERROR);
export const submitFailed = createAction(ADD_DEPARTMENT_FAILED);

export const initIceList = createAction(ICE_LIST);
export const initIceListSuccess = createAction(ICE_LIST_SUCCESS);
export const initIceListError = createAction(ICE_LIST_ERROR);
export const initIceListFailed = createAction(ICE_LIST_FAILED);

export const init = createAction(INIT);

export const initDepartmentDetail = createAction(DEPARTMENT_DETAIL);
export const initDepartmentDetailSuccess = createAction(
  DEPARTMENT_DETAIL_SUCCESS,
);
export const initDepartmentDetailError = createAction(DEPARTMENT_DETAIL_ERROR);
export const initDepartmentDetailFailed = createAction(
  DEPARTMENT_DETAIL_FAILED,
);
