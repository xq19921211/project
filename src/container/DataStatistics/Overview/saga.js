import { get, post } from '@/util/request';
import { message } from 'antd';
import { call, put, takeEvery } from 'redux-saga/effects';

import * as actions from './action';
import * as types from './constant';

function* getDataPresentation(action) {
  try {
    const response = yield call(post, `/statistics/getDataPresentation`, {
      ...action.payload,
    });
    yield put(actions.getDataPresentationSuccess(response));
  } catch (e) {
    yield put(actions.getDataPresentationError(e.message));
    message.error(e.code ? e.message : '查询数据总览-数据简报-基本数据失败');
  }
}

function* getPeopleStatistisc(action) {
  try {
    const response = yield call(post, `/statistics/getPeopleStatistisc`, {
      ...action.payload,
    });
    yield put(actions.getPeopleStatistiscSuccess(response));
  } catch (e) {
    yield put(actions.getPeopleStatistiscError(e.message));
    message.error(e.code ? e.message : '查询数据总览-数据简报-人相关数据失败');
  }
}

function* getThingStatistisc(action) {
  try {
    const response = yield call(post, `/statistics/getThingStatistisc`, {
      ...action.payload,
    });
    yield put(actions.getThingStatistiscSuccess(response));
  } catch (e) {
    yield put(actions.getThingStatistiscError(e.message));
    message.error(e.code ? e.message : '查询数据总览-数据简报-事相关数据失败');
  }
}

function* getGoodsStatistisc(action) {
  try {
    const response = yield call(post, `/statistics/getGoodsStatistisc`, {
      ...action.payload,
    });
    yield put(actions.getGoodsStatistiscSuccess(response));
  } catch (e) {
    yield put(actions.getGoodsStatistiscError(e.message));
    message.error(
      e.code ? e.message : '查询数据总览-数据简报-物-财相关数据失败',
    );
  }
}

function* getOrderMoneyByPieChart(action) {
  try {
    const response = yield call(post, `/statistics/getOrderMoneyByPieChart`, {
      ...action.payload,
    });
    yield put(actions.getOrderMoneyByPieChartSuccess(response));
  } catch (e) {
    yield put(actions.getOrderMoneyByPieChartError(e.message));
    message.error(e.code ? e.message : '查询数据失败');
  }
}
function* getOrderMoneyData(action) {
  try {
    const response = yield call(post, `/statistics/getOrderMoneyData`, {
      ...action.payload,
    });
    yield put(actions.getOrderMoneyDataSuccess(response));
  } catch (e) {
    yield put(actions.getOrderMoneyDataError(e.message));
    message.error(e.code ? e.message : '查询数据失败');
  }
}
function* getOrderCountData(action) {
  try {
    const response = yield call(post, `/statistics/getOrderCountData`, {
      ...action.payload,
    });
    yield put(actions.getOrderCountDataSuccess(response));
  } catch (e) {
    yield put(actions.getOrderCountDataError(e.message));
    message.error(e.code ? e.message : '查询数据失败');
  }
}
function* getUserCountDataByPieChart(action) {
  try {
    const response = yield call(
      post,
      `/statistics/getUserCountDataByPieChart`,
      {
        ...action.payload,
      },
    );
    yield put(actions.getUserCountDataByPieChartSuccess(response));
  } catch (e) {
    yield put(actions.getUserCountDataByPieChartError(e.message));
    message.error(e.code ? e.message : '查询数据失败');
  }
}
function* getUserCountData(action) {
  try {
    const response = yield call(post, `/statistics/getUserCountData`, {
      ...action.payload,
    });
    yield put(actions.getUserCountDataSuccess(response));
  } catch (e) {
    yield put(actions.getUserCountDataError(e.message));
    message.error(e.code ? e.message : '查询数据失败');
  }
}
function* getCoverProjectCount(action) {
  try {
    const response = yield call(post, `/statistics/getCoverProjectCount`, {
      ...action.payload,
    });
    yield put(actions.getCoverProjectCountSuccess(response));
  } catch (e) {
    yield put(actions.getCoverProjectCountError(e.message));
    message.error(e.code ? e.message : '查询数据失败');
  }
}

export default function*() {
  yield takeEvery(types.GET_DATA_PRESENTATION, getDataPresentation);
  yield takeEvery(types.GET_PEOPLE_STATISTISC, getPeopleStatistisc);
  yield takeEvery(types.GET_THING_STATISTISC, getThingStatistisc);
  yield takeEvery(types.GET_GOODS_STATISTISC, getGoodsStatistisc);
  yield takeEvery(types.GET_ORDER_MONEY_BY_PIE_CHART, getOrderMoneyByPieChart);
  yield takeEvery(types.GET_ORDER_MONEY_DATA, getOrderMoneyData);
  yield takeEvery(types.GET_ORDER_COUNT_DATA, getOrderCountData);
  yield takeEvery(
    types.GET_USER_COUNT_DATA_BY_PIE_CHART,
    getUserCountDataByPieChart,
  );
  yield takeEvery(types.GET_USER_COUNT_DATA, getUserCountData);
  yield takeEvery(types.GET_COVER_PROJECT_COUNT, getCoverProjectCount);
}
