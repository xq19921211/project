/*
 * @Author: LiaoYingLong
 * @Date: 2018-06-27 21:34:47
 * @Last Modified by: WangQiBiao
 * @Last Modified time: 2018-10-22 17:17:01
 */

import {
    classify,
    coverCount,
    getStatisticsReducerName,
    monthStatistics,
    orderCount,
    orderMoney,
    userCount,
    userTypeCount,
} from './reducer';

import { createSelector } from 'reselect';

export const getMonthStatistics = createSelector(
    state => state[getStatisticsReducerName][monthStatistics],
    data => data,
);
export const getClassifySelector = createSelector(
    state =>
        state[getStatisticsReducerName][classify].map(item => {
            return {
                x: item.categoryName,
                y: item.orderMoney || 0,
            };
        }),
    data => data,
);

export const getOrderCountSelector = createSelector(
    state =>
        state[getStatisticsReducerName][orderCount].map(item => {
            return {
                x: item.displayDate,
                y: item.orderCount || 0,
            };
        }),
    data => data,
);
export const getOrderMoneySelector = createSelector(
    state =>
        state[getStatisticsReducerName][orderMoney].map(item => {
            return {
                x: item.displayDate,
                y: item.orderMoney || 0,
            };
        }),
    data => data,
);
export const getUserTypeCountSelector = createSelector(
    state =>
        state[getStatisticsReducerName][userTypeCount]
            .map(item => {
                return {
                    x: item.userType,
                    y: item.userCount || 0,
                };
            })
            .sort((a, b) => a.x.localeCompare(b.x)),
    data => data,
);
export const getuserCountSelector = createSelector(state => {
    function format(data) {
        const hashTable = {};
        return data.reduce((arr, item) => {
            const { userType, userCount, displayDate } = item;
            let index = hashTable[userType];
            if (index !== undefined) {
                arr[index] = {
                    ...arr[index],
                    [displayDate]: userCount,
                };
            } else {
                hashTable[item.userType] =
                    arr.push({
                        userType,
                        [displayDate]: userCount,
                    }) - 1;
            }
            return arr;
        }, []);
    }
    const fields = state[getStatisticsReducerName][userCount].map(
        item => item.displayDate,
    );
    const tempObj = fields.reduce((obj, item) => {
        obj[item] = 0;
        return obj;
    }, {});
    const chartData = format(state[getStatisticsReducerName][userCount])
        .map(item => {
            return { ...tempObj, ...item };
        })
        .sort((a, b) => a.userType.localeCompare(b.userType));

    return {
        chartData,
        fields: [...new Set(fields)],
    };
}, data => data);

export const getCoverCountSelector = createSelector(
    state =>
        state[getStatisticsReducerName][coverCount].map(item => {
            return {
                x: item.displayDate,
                y: item.projectCount || 0,
            };
        }),
    data => data,
);
