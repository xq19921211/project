/**
 * Created by xu.long on 2018/5/26.
 */
import {
  AREA_PRO_LIST_SUCCESS,
  INIT,
  PROJECT_DETAIL,
  PROJECT_DETAIL_ERROR,
  PROJECT_DETAIL_FAILED,
  PROJECT_DETAIL_SUCCESS,
} from './constant';
import { Action, createAction, handleActions } from 'redux-actions';

import { EC_PROJECT_DETAIL } from '../../../../constant';

export const name = EC_PROJECT_DETAIL;

export const projectDetailReducer = handleActions(
  {
    [PROJECT_DETAIL_SUCCESS]: (state, action) => {
      return Object.assign({}, state, {
        data: action.payload.data,
      });
    },
    [INIT]: (state, action) => {
      return Object.assign({}, state, {
        data: {},
      });
    },
    [AREA_PRO_LIST_SUCCESS]: (state, action) => {
      return Object.assign({}, state, {
        areaProList: action.payload.data,
      });
    },
  },
  {
    data: {},
    areaProList: {
      dataSource: [],
    },
  },
);
