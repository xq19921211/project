/*
 * @Author: LiaoYingLong
 * @Date: 2018-10-21 18:36:29
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-10-24 14:17:45
 */

import { createAction } from 'redux-actions';

import * as types from './constant';

/**
 * 数据总览-数据简报-基本数据（上）
 */
export const getDataPresentation = createAction(types.GET_DATA_PRESENTATION);
export const getDataPresentationSuccess = createAction(
  types.GET_DATA_PRESENTATION_SUCCESS,
);
export const getDataPresentationError = createAction(
  types.GET_DATA_PRESENTATION_ERROR,
);
/**
 * 数据总览-数据简报-人相关数据
 */
export const getPeopleStatistisc = createAction(types.GET_PEOPLE_STATISTISC);
export const getPeopleStatistiscSuccess = createAction(
  types.GET_PEOPLE_STATISTISC_SUCCESS,
);
export const getPeopleStatistiscError = createAction(
  types.GET_PEOPLE_STATISTISC_ERROR,
);
/**
 * 数据总览-数据简报-事相关数据
 */
export const getThingStatistisc = createAction(types.GET_THING_STATISTISC);
export const getThingStatistiscSuccess = createAction(
  types.GET_THING_STATISTISC_SUCCESS,
);
export const getThingStatistiscError = createAction(
  types.GET_THING_STATISTISC_ERROR,
);
/**
 * 数据总览-数据简报-物-财相关数据
 */
export const getGoodsStatistisc = createAction(types.GET_GOODS_STATISTISC);
export const getGoodsStatistiscSuccess = createAction(
  types.GET_GOODS_STATISTISC_SUCCESS,
);
export const getGoodsStatistiscError = createAction(
  types.GET_GOODS_STATISTISC_ERROR,
);

/**
 * 数据总览 || 事业部数据-消费分析(饼状图)
 */
export const getOrderMoneyByPieChart = createAction(
  types.GET_ORDER_MONEY_BY_PIE_CHART,
);
export const getOrderMoneyByPieChartSuccess = createAction(
  types.GET_ORDER_MONEY_BY_PIE_CHART_SUCCESS,
);
export const getOrderMoneyByPieChartError = createAction(
  types.GET_ORDER_MONEY_BY_PIE_CHART_ERROR,
);
//--
export const getOrderMoneyData = createAction(types.GET_ORDER_MONEY_DATA);
export const getOrderMoneyDataSuccess = createAction(
  types.GET_ORDER_MONEY_DATA_SUCCESS,
);
export const getOrderMoneyDataError = createAction(
  types.GET_ORDER_MONEY_DATA_ERROR,
);

//--
export const getOrderCountData = createAction(types.GET_ORDER_COUNT_DATA);
export const getOrderCountDataSuccess = createAction(
  types.GET_ORDER_COUNT_DATA_SUCCESS,
);
export const getOrderCountDataError = createAction(
  types.GET_ORDER_COUNT_DATA_ERROR,
);

//--
export const getUserCountDataByPieChart = createAction(
  types.GET_USER_COUNT_DATA_BY_PIE_CHART,
);
export const getUserCountDataByPieChartSuccess = createAction(
  types.GET_USER_COUNT_DATA_BY_PIE_CHART_SUCCESS,
);
export const getUserCountDataByPieChartError = createAction(
  types.GET_USER_COUNT_DATA_BY_PIE_CHART_ERROR,
);
//--
export const getUserCountData = createAction(types.GET_USER_COUNT_DATA);
export const getUserCountDataSuccess = createAction(
  types.GET_USER_COUNT_DATA_SUCCESS,
);
export const getUserCountDataError = createAction(
  types.GET_USER_COUNT_DATA_ERROR,
);
//--
export const getCoverProjectCount = createAction(types.GET_COVER_PROJECT_COUNT);
export const getCoverProjectCountSuccess = createAction(
  types.GET_COVER_PROJECT_COUNT_SUCCESS,
);
export const getCoverProjectCountError = createAction(
  types.GET_COVER_PROJECT_COUNT_ERROR,
);

//--
export const resetStore = createAction(types.RESET_STORE);
