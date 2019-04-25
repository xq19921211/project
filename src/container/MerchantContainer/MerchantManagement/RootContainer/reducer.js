/**
 * Created by xu.long on 2018/5/18.
 */
import { createAction, handleActions, Action } from 'redux-actions';
import {
  MERCHANT_MANAGEMENT,
  MERCHANT_MANAGEMENT_SUCCESS,
  MERCHANT_MANAGEMENT_ERROR,
  MERCHANT_MANAGEMENT_FAILED,
  MODIFY_LIST_STATUS_SUCCESS,
} from './constant';

import { EC_MERCHANT_MANAGEMENT } from '../../../../constant';
import { clone } from '../../../../util/util';

export const name = EC_MERCHANT_MANAGEMENT;

export const merchantManagementReducer = handleActions(
  {
    [MERCHANT_MANAGEMENT_SUCCESS]: (state, action) => {
      console.log(
        'merchantManagementReducer login success action: ' +
          JSON.stringify(action),
      );
      return Object.assign({}, state, {
        data: action.payload.data,
      });
    },
    [MODIFY_LIST_STATUS_SUCCESS]: (state, action) => {
      console.log(
        'merchantManagementReducer MODIFY_LIST_STATUS_SUCCESS success action: ' +
          JSON.stringify(action),
      );
      let temp = clone(state.data.dataSource);
      temp[action.payload.record.key].supStatus = action.payload.record.status;
      // temp.splice(action.payload.record.key, 1, action.payload.record);
      let obj = Object.assign({}, state.data, {
        dataSource: temp,
      });
      return Object.assign({}, state, {
        data: obj,
      });
    },
  },
  {
    data: {
      current: 1,
      dataSource: [],
      total: 0,
    },
  },
);
