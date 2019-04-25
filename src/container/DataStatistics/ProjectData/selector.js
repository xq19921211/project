/*
 * @Author: LiaoYingLong
 * @Date: 2018-06-27 21:34:47
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-10-25 11:58:07
 */

import { createSelector } from 'reselect';

import {
  operatorAnalysis,
  operatorIncome,
  projectData,
  projectDataReducerName,
  projectInfo,
} from './reducer';

export const getProjectInfoSelector = createSelector(
  state => state[projectDataReducerName][projectInfo],
  data => data,
);
export const getProjectDataSelector = createSelector(
  state => state[projectDataReducerName][projectData],
  data => data,
);

export const getOperatorAnalysisSelector = createSelector(
  state => state[projectDataReducerName][operatorAnalysis],
  data => data,
);

export const getOperatorAnalysisHistogramDataSelector = createSelector(
  state => state[projectDataReducerName][operatorAnalysis],
  ({ histogramDataVos }) => {
    if (!histogramDataVos) return { chartData: [], fields: [] };

    let fields = [...new Set(histogramDataVos.map(item => item.time))];

    let types = [
      'abnormalOrderNumHistogram',
      'niceCommentNumHistogram',
      'negativeCommentHistogram',
      'noCommentHistogram',
      'other',
    ];

    let typeDesc = ['异常订单', '好评订单', '差评订单', '未评价订单', '其他'];

    let chartData = types.map((type, i) => {
      return histogramDataVos.reduce(
        (obj, item) => {
          return {
            ...obj,
            [item.time]: item[type],
          };
        },
        { type: typeDesc[i] },
      );
    });

    return { chartData, fields };
  },
);
