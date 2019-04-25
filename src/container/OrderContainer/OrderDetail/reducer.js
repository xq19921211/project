/**
 * Created by xu.long on 2018/5/21.
 */
import { createAction, handleActions, Action } from 'redux-actions';
import {
  ORDER_DETAIL,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_ERROR,
  ORDER_DETAIL_FAILED,
} from './constant';

import { EC_ORDER_DETAIL } from '../../../constant';

export const name = EC_ORDER_DETAIL;

export const orderDetailReducer = handleActions(
  {
    [ORDER_DETAIL_SUCCESS]: (state, action) => {
      console.log(
        'commodityManagementReducer ORDER_DETAIL_SUCCESS success action: ' +
          JSON.stringify(action),
      );
      return Object.assign({}, state, {
        data: action.payload.data,
      });
    },
  },
  {
    data: {
      operates: [],
    },
  },
);
