import {
  ADD_COMMODITY,
  ADD_COMMODITY_ERROR,
  ADD_COMMODITY_FAILED,
  ADD_COMMODITY_SUCCESS,
  INIT_UNIT_SUCCESS,
} from './constant';
/**
 * Created by xu.long on 2018/5/20.
 */
import { Action, createAction, handleActions } from 'redux-actions';

import { EC_ADD_COMMODITY } from '../../../../constant';
import { clone } from '../../../../util/util';

export const name = EC_ADD_COMMODITY;

export const addCommodityReducer = handleActions(
  {
    [ADD_COMMODITY_SUCCESS]: (state, action) => {
      return Object.assign({}, state, {
        data: action.payload.data,
      });
    },
    [INIT_UNIT_SUCCESS]: (state, action) => {
      let temp = [];
      temp = action.payload.map((item, i) => {
        return item.unit;
      });
      return Object.assign({}, state, {
        unitList: temp,
      });
    },
  },
  {
    data: {
      current: 1,
      dataSource: [],
      total: 0,
    },
    unitList: [],
  },
);
