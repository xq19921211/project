/**
 * Created by xu.long on 2018/6/9.
 */
import { createAction, handleActions, Action } from 'redux-actions';
import {
  ADD_MERCHANT_MEMBER,
  ADD_MERCHANT_MEMBER_SUCCESS,
  ADD_MERCHANT_MEMBER_ERROR,
  ADD_MERCHANT_MEMBER_FAILED,
} from './constant';

import { EC_ADD_MERCHANT_MEMBER } from '../../../../constant';

export const name = EC_ADD_MERCHANT_MEMBER;

export const addMerchantMemberReducer = handleActions(
  {
    [ADD_MERCHANT_MEMBER_SUCCESS]: (state, action) => {
      console.log(
        'addMerchantMemberReducer ADD_MERCHANT_MEMBER_SUCCESS success action: ' +
          JSON.stringify(action),
      );
      return Object.assign({}, state, {
        data: action.payload.data,
      });
    },
  },
  {
    data: {},
  },
);
