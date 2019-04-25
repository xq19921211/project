/**
 * Created by xu.long on 2018/5/29.
 */
import { createAction, handleActions, Action } from 'redux-actions';
import {
  ADD_ACCOUNT,
  ADD_ACCOUNT_SUCCESS,
  ADD_ACCOUNT_ERROR,
  ADD_ACCOUNT_FAILED,
  ICE_LIST_SUCCESS,
} from './constant';

import { EC_ADD_ACCOUNT } from '../../../../constant';

export const name = EC_ADD_ACCOUNT;

export const addAccountReducer = handleActions(
  {
    [ICE_LIST_SUCCESS]: (state, action) => {
      console.log(
        'ICE_LIST_SUCCESS ICE_LIST_SUCCESS success action: ' +
          JSON.stringify(action),
      );
      return Object.assign({}, state, {
        data: action.payload.data,
      });
    },
    [ADD_ACCOUNT_SUCCESS]: (state, action) => {
      console.log(
        'addAccountReducer ADD_ACCOUNT_SUCCESS success action: ' +
          JSON.stringify(action),
      );
      return Object.assign({}, state, {
        data: action.payload.data,
      });
    },
  },
  {
    data: {
      content: [],
    },
  },
);
