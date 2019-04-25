/**
 * Created by xu.long on 2018/5/26.
 */
import { createAction, handleActions, Action } from 'redux-actions';
import {
  TENEMENT_MEMBER_DETAIL,
  TENEMENT_MEMBER_DETAIL_SUCCESS,
  TENEMENT_MEMBER_DETAIL_ERROR,
  TENEMENT_MEMBER_DETAIL_FAILED,
  INIT,
} from './constant';

import { EC_TENEMENT_MEMBER_DETAIL } from '../../../../constant';

export const name = EC_TENEMENT_MEMBER_DETAIL;

export const tenementMemberDetailReducer = handleActions(
  {
    [TENEMENT_MEMBER_DETAIL_SUCCESS]: (state, action) => {
      console.log(
        'tenementMemberDetailReducer TENEMENT_MEMBER_DETAIL_SUCCESS success action: ' +
          JSON.stringify(action),
      );
      return Object.assign({}, state, {
        data: action.payload.data,
      });
    },
    [INIT]: (state, action) => {
      console.log(
        'tenementMemberDetailReducer INIT success action: ' +
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
