/*
 * @Author: LiaoYingLong
 * @Date: 2018-06-26 22:52:09
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-10-25 10:57:07
 */

import { handleActions } from 'redux-actions';

import * as actions from './action';
import * as types from './constant';

export const personalDataReducerName = 'DataStatistics/PersonalData';

export const operatorAllDataReport = 'operatorAllDataReport';
export const operatorAnalysis = 'operatorAnalysis';
export const operatorIncome = 'operatorIncome';

const defaultStore = {
  [operatorAllDataReport]: {},
  [operatorAnalysis]: {},
  [operatorIncome]: {},
};
export const personalDataReducer = handleActions(
  {
    [actions.getOperatorAllDataReportSuccess]: (state, action) => {
      return {
        ...state,
        ...{
          [operatorAllDataReport]: action.payload.data || {},
        },
      };
    },
    [actions.getOperatorAnalysisSuccess]: (state, action) => {
      return {
        ...state,
        ...{
          [operatorAnalysis]: action.payload.data || {},
        },
      };
    },
    [actions.getOperatorIncomeSuccess]: (state, action) => {
      return {
        ...state,
        ...{
          [operatorIncome]: action.payload.data || {},
        },
      };
    },
    [actions.resetStore](state, action) {
      return { ...defaultStore };
    },
  },
  { ...defaultStore },
);
