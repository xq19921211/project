/**
 * Created by xu.long on 2018/5/27.
 */
import { createAction, handleActions, Action } from 'redux-actions';
import {
  ACCOUNT_DETAIL,
  ACCOUNT_DETAIL_SUCCESS,
  ACCOUNT_DETAIL_ERROR,
  ACCOUNT_DETAIL_FAILED,
  INIT,
} from './constant';

import { EC_ACCOUNT_DETAIL } from '../../../../constant';

export const name = EC_ACCOUNT_DETAIL;

export const accountDetailReducer = handleActions(
  {
    [ACCOUNT_DETAIL_SUCCESS]: (state, action) => {
      console.log(
        'accountDetailReducer ACCOUNT_DETAIL_SUCCESS success action: ' +
          JSON.stringify(action),
      );
      return Object.assign({}, state, {
        data: action.payload.data,
      });
    },
    [INIT]: (state, action) => {
      console.log(
        'merchantMemberDetailReducer INIT success action: ' +
          JSON.stringify(action),
      );
      return Object.assign({}, state, {
        data: {},
      });
    },
  },
  {
    data: {},
  },
);
