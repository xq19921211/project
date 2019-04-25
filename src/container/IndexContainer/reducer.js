/**
 * Created by xu.long on 26/03/2018.
 */
import { Action, createAction, handleActions } from 'redux-actions';
import { GET_MENU_LIST_SUCCESS, GET_USER_INFO_SUCCESS } from './constant';

import { EC_GET_MENU_LIST } from '../../constant';

export const name = EC_GET_MENU_LIST;

export const getMenuListReducer = handleActions(
  {
    [GET_MENU_LIST_SUCCESS]: (state, action) => {
      return Object.assign({}, state, {
        data: action.payload.data,
      });
    },
    [GET_USER_INFO_SUCCESS]: (state, action) => {
      return Object.assign({}, state, {
        userInfo: action.payload.data,
      });
    },
  },
  {
    data: [],
    userInfo: {},
  },
);
