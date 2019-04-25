/**
 * Created by xu.long on 2018/6/23.
 */
import { createAction, handleActions, Action } from 'redux-actions';
import {
  ADD_ROLE,
  ADD_ROLE_SUCCESS,
  ADD_ROLE_ERROR,
  ADD_ROLE_FAILED,
  ROLE_DETAIL_SUCCESS,
} from './constant';

import { EC_ADD_ROLE } from '../../../../constant';

export const name = EC_ADD_ROLE;

export const addRoleReducer = handleActions(
  {
    [ADD_ROLE_SUCCESS]: (state, action) => {
      console.log(
        'addRoleReducer ADD_ROLE_SUCCESS success action: ' +
          JSON.stringify(action),
      );
      return Object.assign({}, state, {
        data: action.payload.data,
      });
    },
    [ROLE_DETAIL_SUCCESS]: (state, action) => {
      console.log(
        'addRoleReducer ROLE_DETAIL_SUCCESS success action: ' +
          JSON.stringify(action),
      );
      return Object.assign({}, state, {
        detailData: action.payload.data,
      });
    },
  },
  {
    data: {},
    detailData: {},
  },
);
