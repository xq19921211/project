/*
 * @Author: LiaoYingLong
 * @Date: 2018-06-26 22:52:09
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-10-25 11:49:30
 */

import { handleActions } from 'redux-actions';

import * as actions from './action';
import * as types from './constant';

export const projectDataReducerName = 'DataStatistics/ProjectData';

export const projectInfo = 'projectInfo';
export const operatorAnalysis = 'operatorAnalysis';
export const operatorIncome = 'operatorIncome';
export const projectData = 'projectData';
const defaultStore = {
  [projectInfo]: {},
  [operatorAnalysis]: {},
  [operatorIncome]: {},
  [projectData]: {},
};
export const projectDataReducer = handleActions(
  {
    [actions.getProjectInfoSuccess]: (state, action) => {
      return {
        ...state,
        ...{
          [projectInfo]: action.payload.data || {},
        },
      };
    },
    [actions.getProjectDataSuccess]: (state, action) => {
      return {
        ...state,
        ...{
          [projectData]: action.payload.data || {},
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

    [actions.resetStore](state, action) {
      return { ...defaultStore };
    },
  },
  { ...defaultStore },
);
