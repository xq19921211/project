/**
 * Created by xu.long on 2018/5/19.
 */
import { createAction, handleActions, Action } from 'redux-actions';
import { ORDER, ORDER_SUCCESS, ORDER_ERROR, ORDER_FAILED } from './constant';

import { EC_ORDER } from '../../../constant';

export const name = EC_ORDER;

export const orderReducer = handleActions(
  {
    [ORDER_SUCCESS]: (state, action) => {
      console.log(
        'orderReducer ORDER_SUCCESS success action: ' + JSON.stringify(action),
      );
      return Object.assign({}, state, {
        data: action.payload.data,
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
