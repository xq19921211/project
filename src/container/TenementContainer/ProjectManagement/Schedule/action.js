import * as types from './constant';

import { createAction } from 'redux-actions';

export const getScheduleDetail = createAction(types.GET_SCHEDULE_DETAIL);
export const getScheduleDetailSuccess = createAction(
  types.GET_SCHEDULE_DETAIL_SUCCESS,
);
export const getScheduleDetailError = createAction(
  types.GET_SCHEDULE_DETAIL_ERROR,
);

export const addSchedule = createAction(types.ADD_SCHEDULE);
export const addScheduleSuccess = createAction(types.ADD_SCHEDULE_SUCCESS);
export const addScheduleError = createAction(types.ADD_SCHEDULE_ERROR);
