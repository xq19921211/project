/**
 * Created by xu.long on 2018/6/18.
 */
import { createAction, Action } from 'redux-actions';
import {
  BUILDER,
  BUILDER_SUCCESS,
  BUILDER_ERROR,
  BUILDER_FAILED,
  MODIFY_LIST_STATUS,
  MODIFY_LIST_STATUS_SUCCESS,
  MODIFY_LIST_STATUS_FAILED,
  MODIFY_LIST_STATUS_ERROR,
  DELETE_BUILDER,
  DELETE_BUILDER_SUCCESS,
  DELETE_BUILDER_FAILED,
  DELETE_BUILDER_ERROR,
} from './constant';

export const initBuilderList = createAction(BUILDER);
export const initBuilderListSuccess = createAction(BUILDER_SUCCESS);
export const initBuilderListError = createAction(BUILDER_ERROR);
export const initBuilderListFailed = createAction(BUILDER_FAILED);

export const modifyListStatus = createAction(MODIFY_LIST_STATUS);
export const modifyListStatusSuccess = createAction(MODIFY_LIST_STATUS_SUCCESS);
export const modifyListStatusError = createAction(MODIFY_LIST_STATUS_ERROR);
export const modifyListStatusFailed = createAction(MODIFY_LIST_STATUS_FAILED);

export const deleteBuilder = createAction(DELETE_BUILDER);
export const deleteBuilderSuccess = createAction(DELETE_BUILDER_SUCCESS);
export const deleteBuilderError = createAction(DELETE_BUILDER_ERROR);
export const deleteBuilderFailed = createAction(DELETE_BUILDER_FAILED);