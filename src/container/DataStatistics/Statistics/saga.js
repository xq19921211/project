/*
 * @Author: LiaoYingLong
 * @Date: 2018-06-27 00:28:55
 * @Last Modified by: WangQiBiao
 * @Last Modified time: 2018-10-22 17:16:44
 */

import * as actions from './action';
import * as types from './constant';

import { call, put, takeEvery } from 'redux-saga/effects';

import { message } from 'antd';
import { post } from '@/util/request';

function getReqMethods(
    url,
    successHandler,
    errorHandler,
    defaultMessage = '查询数据失败',
) {
    return function*({ payload }) {
        try {
            const response = yield call(post, url, payload);
            yield put(successHandler(response));
        } catch (e) {
            yield put(errorHandler(e.message));
            message.error(e.code ? e.message : defaultMessage);
        }
    };
}

const getMonthStatisticsRelated = getReqMethods(
    '/count/month',
    actions.getMonthStatisticsRelatedSuccess,
    actions.getMonthStatisticsRelatedError,
);
const getClassify = getReqMethods(
    '/count/classify',
    actions.getClassifySuccess,
    actions.getClassifyError,
);
const getOrderMoney = getReqMethods(
    '/count/orderMoney',
    actions.getOrderMoneySuccess,
    actions.getOrderMoneyError,
);
const getOrderCount = getReqMethods(
    '/count/orderCount',
    actions.getOrderCountSuccess,
    actions.getOrderCountError,
);
const getUserTypeCount = getReqMethods(
    '/count/user/type',
    actions.getUserTypeCountSuccess,
    actions.getUserTypeCountError,
);
const getUserCount = getReqMethods(
    '/count/user',
    actions.getUserCountSuccess,
    actions.getUserCountError,
);
const getCoverCount = getReqMethods(
    '/count/cover',
    actions.getCoverCountSuccess,
    actions.getCoverCountError,
);

export default function* getMonthStatisticsRelatedSaga() {
    yield takeEvery(
        types.GET_MONTH_STATISTICS_RELATED,
        getMonthStatisticsRelated,
    );
    yield takeEvery(types.GET_CLASSIFY, getClassify);
    yield takeEvery(types.GET_ORDER_MONEY, getOrderMoney);
    yield takeEvery(types.GET_ORDER_COUNT, getOrderCount);
    yield takeEvery(types.GET_USER_TYPE_COUNT, getUserTypeCount);
    yield takeEvery(types.GET_USER_COUNT, getUserCount);
    yield takeEvery(types.GET_COVER_COUNT, getCoverCount);
}
