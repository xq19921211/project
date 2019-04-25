/*
 * @Author: LiaoYingLong
 * @Date: 2018-06-27 21:34:47
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-10-25 10:55:23
 */

import { createSelector } from 'reselect';

import {
  coverProjectCount,
  getDataPresentation,
  getGoodsStatistisc,
  getPeopleStatistisc,
  getThingStatistisc,
  orderCountData,
  orderMoneyByPieChart,
  orderMoneyData,
  overviewReducerName,
  userCountData,
  userCountDataByPieChart,
} from './reducer';

/**
 * 数据总览-数据简报-基本数据（上）
 */
export const getDataPresentationSelector = createSelector(
  state => state[overviewReducerName][getDataPresentation],
  data => data,
);
/**
 * 数据总览-数据简报-人相关数据
 */
export const getPeopleStatistiscSelector = createSelector(
  state => state[overviewReducerName][getPeopleStatistisc],
  data => data,
);
/**
 * 数据总览-数据简报-事相关数据
 */
export const getThingStatistiscSelector = createSelector(
  state => state[overviewReducerName][getThingStatistisc],
  data => data,
);
/**
 * 数据总览-数据简报-物-财相关数据
 */
export const getGoodsStatistiscSelector = createSelector(
  state => state[overviewReducerName][getGoodsStatistisc],
  data => data,
);
/**
 * 数据总览 || 事业部数据-消费分析(饼状图)
 */
export const getOrderMoneyByPieChartSelector = createSelector(
  state => state[overviewReducerName][orderMoneyByPieChart],
  data => data.map(item => ({ x: item.categoryName, y: item.orderMoney })),
);
/**
 * 数据总览 || 事业部数据-消费分析(柱状图)
 */
export const getOrderMoneyDataSelector = createSelector(
  state => state[overviewReducerName][orderMoneyData],
  data => data.map(item => ({ x: item.displayDate, y: item.orderMoney })),
);

export const getOrderCountDataSelector = createSelector(
  state => state[overviewReducerName][orderCountData],
  data => data.map(item => ({ x: item.displayDate, y: item.orderCount })),
);

export const getUserCountDataSelector = createSelector(
  state => state[overviewReducerName][userCountData],
  data => {
    let fields = [...new Set(data.map(item => item.displayDate))];
    let userTypes = [...new Set(data.map(item => item.userType))];

    let chartData = userTypes.map(userType => {
      return data.reduce(
        (obj, item) => {
          if (item.userType === userType) {
            obj[item.displayDate] = item.userCount;
          }
          return obj;
        },
        { userType },
      );
    });

    return { chartData, fields };
  },
);
export const getUserCountDataByPieChartSelector = createSelector(
  state => state[overviewReducerName][userCountDataByPieChart],
  data => data.map(item => ({ x: item.userType, y: item.userCount })),
);

export const getCoverProjectCountSelector = createSelector(
  state => state[overviewReducerName][coverProjectCount],
  data => data.map(item => ({ x: item.displayDate, y: item.projectCount })),
);
