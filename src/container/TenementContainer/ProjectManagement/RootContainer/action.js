/**
 * Created by xu.long on 2018/5/19.
 */

import { Action, createAction } from 'redux-actions';

import * as types from './constant';

export const initProjectList = createAction(types.PROJECT_MANAGEMENT);
export const initProjectListSuccess = createAction(
  types.PROJECT_MANAGEMENT_SUCCESS,
);
export const initProjectListError = createAction(
  types.PROJECT_MANAGEMENT_ERROR,
);
export const initProjectListFailed = createAction(
  types.PROJECT_MANAGEMENT_FAILED,
);

export const projectDel = createAction(types.PROJECT_DEL);
export const projectDelSuccess = createAction(types.PROJECT_DEL_SUCCESS);
export const projectDelFailed = createAction(types.PROJECT_DEL_FAILED);

export const importExcel = createAction(types.IMPORT_EXCEL);
export const importExcelSuccess = createAction(types.IMPORT_EXCEL_SUCCESS);
export const importExcelFailed = createAction(types.IMPORT_EXCEL_FAILED);

export const exportExcel = createAction(types.EXPORT_EXCEL);
export const exportExcelSuccess = createAction(types.EXPORT_EXCEL_SUCCESS);
export const exportExcelFailed = createAction(types.EXPORT_EXCEL_FAILED);
