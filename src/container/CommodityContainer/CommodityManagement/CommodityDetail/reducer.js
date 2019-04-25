/**
 * Created by xu.long on 2018/5/21.
 */
import { createAction, handleActions, Action } from 'redux-actions';
import {
  INIT,
  COMMODITY_DETAIL,
  COMMODITY_DETAIL_SUCCESS,
  COMMODITY_DETAIL_ERROR,
  COMMODITY_DETAIL_FAILED,
} from './constant';

import { EC_COMMODITY_DETAIL } from '../../../../constant';
import { clone } from '../../../../util/util';

export const name = EC_COMMODITY_DETAIL;

export const commodityDetailReducer = handleActions(
  {
    [INIT]: (state, action) => {
      console.log(
        'commodityManagementReducer INIT success action: ' +
          JSON.stringify(action),
      );
      return Object.assign({}, state, {
        data: {},
      });
    },
    [COMMODITY_DETAIL_SUCCESS]: (state, action) => {
      console.log(
        'commodityManagementReducer COMMODITY_DETAIL_SUCCESS success action: ' +
          JSON.stringify(action),
      );
      let obj = clone(action.payload.data);
      switch (action.payload.status) {
        case 0:
          obj.statusName = '已下架';
          break;
        case 1:
          obj.statusName = '等待上架';
          break;
        case 2:
          obj.statusName = '已上架';
          break;
        default:
          obj.statusName = '已下架';
          break;
      }
      return Object.assign({}, state, {
        data: obj,
      });
    },
  },
  {
    data: {},
  },
);
