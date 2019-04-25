/**
 * Created by xu.long on 2018/6/6.
 */
import { createAction, handleActions, Action } from 'redux-actions';
import {
  MERCHANT_MEMBER_DETAIL,
  MERCHANT_MEMBER_DETAIL_SUCCESS,
  MERCHANT_MEMBER_DETAIL_ERROR,
  MERCHANT_MEMBER_DETAIL_FAILED,
  INIT,
} from './constant';

import { EC_MERCHANT_MEMBER_DETAIL } from '../../../../constant';

export const name = EC_MERCHANT_MEMBER_DETAIL;

export const merchantMemberDetailReducer = handleActions(
  {
    [MERCHANT_MEMBER_DETAIL_SUCCESS]: (state, action) => {
      console.log(
        'merchantMemberDetailReducer MERCHANT_MEMBER_DETAIL_SUCCESS success action: ' +
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
