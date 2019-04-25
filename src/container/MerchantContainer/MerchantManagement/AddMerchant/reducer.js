/**
 * Created by xu.long on 2018/5/25.
 */

import { INIT, MERCHANT_DETAIL_SUCCESS } from './constant';

import { EC_ADD_MERCHANT } from '../../../../constant';
import { handleActions } from 'redux-actions';

export const name = EC_ADD_MERCHANT;

export const addMerchantReducer = handleActions(
  {
    [INIT]: (state, action) => {
      console.log(
        'addMerchantReducer INIT success action: ' + JSON.stringify(action),
      );
      return Object.assign({}, state, {
        merchantDetail: {},
      });
    },
    [MERCHANT_DETAIL_SUCCESS]: (state, action) => {
      console.log(
        'addMerchantReducer MERCHANT_DETAIL_SUCCESS success action: ' +
          JSON.stringify(action),
      );
      return Object.assign({}, state, {
        merchantDetail: action.payload.data,
      });
    },
  },
  {
    merchantDetail: {},
  },
);
