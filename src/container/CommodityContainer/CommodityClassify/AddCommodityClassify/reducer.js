/**
 * Created by xu.long on 2018/6/5.
 */
import { createAction, handleActions, Action } from 'redux-actions';
import {
  ADD_COMMODITY_CLASSIFY,
  ADD_COMMODITY_CLASSIFY_SUCCESS,
  ADD_COMMODITY_CLASSIFY_ERROR,
  ADD_COMMODITY_CLASSIFY_FAILED,
  INIT,
  COMMODITY_CLASSIFY_DETAIL,
  COMMODITY_CLASSIFY_DETAIL_SUCCESS,
  COMMODITY_CLASSIFY_DETAIL_FAILED,
  COMMODITY_CLASSIFY_DETAIL_ERROR,
} from './constant';

import { EC_ADD_COMMODITY_CLASSIFY } from '../../../../constant';

export const name = EC_ADD_COMMODITY_CLASSIFY;

export const addCommodityClassifyReducer = handleActions(
  {
    [INIT]: (state, action) => {
      console.log(
        'addCommodityClassifyReducer INIT success action: ' +
          JSON.stringify(action),
      );
      return Object.assign({}, state, {
        detailData: {},
      });
    },
    [COMMODITY_CLASSIFY_DETAIL_SUCCESS]: (state, action) => {
      console.log(
        'addCommodityClassifyReducer COMMODITY_CLASSIFY_DETAIL_SUCCESS success action: ' +
          JSON.stringify(action),
      );
      return Object.assign({}, state, {
        detailData: action.payload.data,
      });
    },
  },
  {
    data: {},
    detailData: {},
  },
);
