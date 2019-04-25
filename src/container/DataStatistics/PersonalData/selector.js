/*
 * @Author: LiaoYingLong
 * @Date: 2018-06-27 21:34:47
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-10-25 11:23:01
 */

import { createSelector } from 'reselect';

import {
  operatorAllDataReport,
  operatorAnalysis,
  operatorIncome,
  personalDataReducerName,
} from './reducer';

export const getOperatorAllDataReportSelector = createSelector(
  state => state[personalDataReducerName][operatorAllDataReport],
  data => data,
);

export const getOperatorAnalysisSelector = createSelector(
  state => state[personalDataReducerName][operatorAnalysis],
  data => data,
);

export const getOperatorAnalysisHistogramDataSelector = createSelector(
  state => state[personalDataReducerName][operatorAnalysis],
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

export const getOperatorIncomeSelector = createSelector(
  state => state[personalDataReducerName][operatorIncome],
  data => data,
);

export const getOperatorIncomeHistogramDataSelector = createSelector(
  state => state[personalDataReducerName][operatorIncome],
  ({ incomes }) => {
    if (!incomes) return { chartData: [], fields: [] };

    let fields = [...new Set(incomes.map(item => item.time))];

    let types = ['deductionsMoney', 'rewardMoney', 'normalMoney'];

    let typeDesc = ['扣款', '奖励收入', '正常收入'];

    let chartData = types.map((type, i) => {
      return incomes.reduce(
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
