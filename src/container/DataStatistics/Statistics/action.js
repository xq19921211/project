/*
 * @Author: LiaoYingLong
 * @Date: 2018-06-27 21:31:08
 * @Last Modified by: WangQiBiao
 * @Last Modified time: 2018-10-22 17:16:01
 */

import * as types from './constant';

import { createAction } from 'redux-actions';

export const getMonthStatisticsRelated = createAction(
    types.GET_MONTH_STATISTICS_RELATED,
);
export const getMonthStatisticsRelatedError = createAction(
    types.GET_MONTH_STATISTICS_RELATED_ERROR,
);
export const getMonthStatisticsRelatedSuccess = createAction(
    types.GET_MONTH_STATISTICS_RELATED_SUCCESS,
);

export const getClassify = createAction(types.GET_CLASSIFY);
export const getClassifyError = createAction(types.GET_CLASSIFY_ERROR);
export const getClassifySuccess = createAction(types.GET_CLASSIFY_SUCCESS);

export const getOrderMoney = createAction(types.GET_ORDER_MONEY);
export const getOrderMoneyError = createAction(types.GET_ORDER_MONEY_ERROR);
export const getOrderMoneySuccess = createAction(types.GET_ORDER_MONEY_SUCCESS);

export const getOrderCount = createAction(types.GET_ORDER_COUNT);
export const getOrderCountError = createAction(types.GET_ORDER_COUNT_ERROR);
export const getOrderCountSuccess = createAction(types.GET_ORDER_COUNT_SUCCESS);

export const getUserTypeCount = createAction(types.GET_USER_TYPE_COUNT);
export const getUserTypeCountSuccess = createAction(
    types.GET_USER_TYPE_COUNT_SUCCESS,
);
export const getUserTypeCountError = createAction(
    types.GET_USER_TYPE_COUNT_ERROR,
);

export const getUserCount = createAction(types.GET_USER_COUNT);
export const getUserCountSuccess = createAction(types.GET_USER_COUNT_SUCCESS);
export const getUserCountError = createAction(types.GET_USER_COUNT_ERROR);

export const getCoverCount = createAction(types.GET_COVER_COUNT);
export const getCoverCountSuccess = createAction(types.GET_COVER_COUNT_SUCCESS);
export const getCoverCountError = createAction(types.GET_COVER_COUNT_ERROR);
