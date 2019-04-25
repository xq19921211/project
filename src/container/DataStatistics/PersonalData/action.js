/*
 * @Author: LiaoYingLong
 * @Date: 2018-10-21 18:36:29
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-10-25 10:56:07
 */

import { createAction } from 'redux-actions';

import * as types from './constant';

export const getOperatorAllDataReport = createAction(
  types.GET_OPERATOR_ALL_DATA_REPORT,
);
export const getOperatorAllDataReportSuccess = createAction(
  types.GET_OPERATOR_ALL_DATA_REPORT_SUCCESS,
);
export const getOperatorAllDataReportError = createAction(
  types.GET_OPERATOR_ALL_DATA_REPORT_ERROR,
);

export const getOperatorAnalysis = createAction(types.GET_OPERATOR_ANALYSIS);
export const getOperatorAnalysisSuccess = createAction(
  types.GET_OPERATOR_ANALYSIS_SUCCESS,
);
export const getOperatorAnalysisError = createAction(
  types.GET_OPERATOR_ANALYSIS_ERROR,
);

export const getOperatorIncome = createAction(types.GET_OPERATOR_INCOME);
export const getOperatorIncomeSuccess = createAction(
  types.GET_OPERATOR_INCOME_SUCCESS,
);
export const getOperatorIncomeError = createAction(
  types.GET_OPERATOR_INCOME_ERROR,
);

export const resetStore = createAction(types.RESET_STORE);
