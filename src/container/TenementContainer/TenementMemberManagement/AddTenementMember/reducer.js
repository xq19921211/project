/**
 * Created by xu.long on 2018/5/25.
 */
import { createAction, handleActions, Action } from 'redux-actions';
import {
  ADD_TENEMENT_MEMBER,
  ADD_TENEMENT_MEMBER_SUCCESS,
  ADD_TENEMENT_MEMBER_ERROR,
  ADD_TENEMENT_MEMBER_FAILED,
  ICE_LIST_SUCCESS,
} from './constant';

import { EC_ADD_TENEMENT_MEMBER } from '../../../../constant';

export const name = EC_ADD_TENEMENT_MEMBER;

export const addTenementMemberReducer = handleActions(
  {
    [ICE_LIST_SUCCESS]: (state, action) => {
      console.log(
        'addDepartmentReducer ICE_LIST_SUCCESS success action: ' +
          JSON.stringify(action),
      );
      return Object.assign({}, state, {
        data: action.payload.data,
      });
    },
    [ADD_TENEMENT_MEMBER_SUCCESS]: (state, action) => {
      console.log(
        'addTenementMemberReducer ADD_TENEMENT_MEMBER_SUCCESS success action: ' +
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
