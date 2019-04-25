/*
 * @Author: LiaoYingLong
 * @Date: 2018-06-26 22:52:09
 * @Last Modified by: WangQiBiao
 * @Last Modified time: 2018-10-22 17:16:27
 */

import * as types from './constant';

import { handleActions } from 'redux-actions';

export { EC_GET_STATISTICS as getStatisticsReducerName } from '@/constant';

export const monthStatistics = 'monthStatistics';
export const classify = 'classify';
export const orderMoney = 'orderMoney';
export const orderCount = 'orderCount';
export const userTypeCount = 'userTypeCount';
export const userCount = 'userCount';
export const coverCount = 'coverCount';

const defaultData = {
    [monthStatistics]: {},
    [classify]: [],
    [orderMoney]: [],
    [orderCount]: [],
    [userTypeCount]: [],
    [userCount]: [],
    [coverCount]: [],
};

const generateReducer = (actionType, key) => {
    return {
        [actionType]: (state, action) => {
            return {
                ...state,
                ...{
                    [key]: action.payload.data
                        ? action.payload.data.content
                        : [],
                },
            };
        },
    };
};

export const getStatisticsReducer = handleActions(
    {
        ...generateReducer(
            types.GET_MONTH_STATISTICS_RELATED_SUCCESS,
            monthStatistics,
        ),
        ...generateReducer(types.GET_CLASSIFY_SUCCESS, classify),
        ...generateReducer(types.GET_ORDER_COUNT_SUCCESS, orderCount),
        ...generateReducer(types.GET_ORDER_MONEY_SUCCESS, orderMoney),
        ...generateReducer(types.GET_USER_TYPE_COUNT_SUCCESS, userTypeCount),
        ...generateReducer(types.GET_USER_COUNT_SUCCESS, userCount),
        ...generateReducer(types.GET_COVER_COUNT_SUCCESS, coverCount),
    },
    defaultData,
);
