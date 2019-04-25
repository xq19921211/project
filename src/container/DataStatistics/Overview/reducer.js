/*
 * @Author: LiaoYingLong
 * @Date: 2018-06-26 22:52:09
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-10-24 14:19:24
 */

import { handleActions } from 'redux-actions';

import * as actions from './action';
import * as types from './constant';

export const overviewReducerName = 'DataStatistics/Overview';
/**
 * 数据总览-数据简报-基本数据（上）
 */
export const getDataPresentation = 'getDataPresentation';
/**
 * 数据总览-数据简报-人相关数据
 */
export const getPeopleStatistisc = 'getPeopleStatistisc';
/**
 * 数据总览-数据简报-事相关数据
 */
export const getThingStatistisc = 'getThingStatistisc';
/**
 * 数据总览-数据简报-物-财相关数据
 */
export const getGoodsStatistisc = 'getGoodsStatistisc';

/**
 * 数据总览 || 事业部数据-消费分析(饼状图)
 */
export const orderMoneyByPieChart = 'orderMoneyByPieChart';
/**
 * 数据总览 || 事业部数据-消费分析(柱状图)
 */
export const orderMoneyData = 'orderMoneyData';
export const orderCountData = 'orderCountData';
export const userCountData = 'userCountData';
export const userCountDataByPieChart = 'userCountDataByPieChart';
export const coverProjectCount = 'coverProjectCount';

const defaultStore = {
  [getDataPresentation]: {},
  [getPeopleStatistisc]: {},
  [getThingStatistisc]: {},
  [getGoodsStatistisc]: {},
  [orderMoneyData]: [],
  [orderMoneyByPieChart]: [],
  [orderCountData]: [],
  [userCountData]: [],
  [userCountDataByPieChart]: [],
  [coverProjectCount]: [],
};

export const overviewReducer = handleActions(
  {
    [actions.getDataPresentationSuccess]: (state, action) => {
      return {
        ...state,
        ...{
          [getDataPresentation]: action.payload.data || {},
        },
      };
    },
    [actions.getPeopleStatistiscSuccess]: (state, action) => {
      return {
        ...state,
        ...{
          [getPeopleStatistisc]: action.payload.data || {},
        },
      };
    },
    [actions.getThingStatistiscSuccess]: (state, action) => {
      return {
        ...state,
        ...{
          [getThingStatistisc]: action.payload.data || {},
        },
      };
    },
    [actions.getGoodsStatistiscSuccess]: (state, action) => {
      return {
        ...state,
        ...{
          [getGoodsStatistisc]: action.payload.data || {},
        },
      };
    },
    [actions.getOrderMoneyByPieChartSuccess]: (state, action) => {
      return {
        ...state,
        ...{
          [orderMoneyByPieChart]: action.payload.data || [],
        },
      };
    },
    [actions.getOrderMoneyDataSuccess]: (state, action) => {
      return {
        ...state,
        ...{
          [orderMoneyData]: action.payload.data || [],
        },
      };
    },
    [actions.getOrderCountDataSuccess]: (state, action) => {
      return {
        ...state,
        ...{
          [orderCountData]: action.payload.data || [],
        },
      };
    },
    [actions.getUserCountDataSuccess]: (state, action) => {
      return {
        ...state,
        ...{
          [userCountData]: action.payload.data || [],
        },
      };
    },
    [actions.getUserCountDataByPieChartSuccess]: (state, action) => {
      return {
        ...state,
        ...{
          [userCountDataByPieChart]: action.payload.data || [],
        },
      };
    },
    [actions.getCoverProjectCountSuccess]: (state, action) => {
      return {
        ...state,
        ...{
          [coverProjectCount]: action.payload.data || [],
        },
      };
    },
    [actions.resetStore](state, action) {
      return { ...defaultStore };
    },
  },
  { ...defaultStore },
);
