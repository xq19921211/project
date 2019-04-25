/**
 * Created by xu.long on 2018/5/16.
 */
import { Action, createAction, handleActions } from 'redux-actions';
import {
  PROJECT_MANAGEMENT,
  PROJECT_MANAGEMENT_ERROR,
  PROJECT_MANAGEMENT_FAILED,
  PROJECT_MANAGEMENT_SUCCESS,
} from './constant';

import { EC_PROJECT_MANAGEMENT } from '../../../../constant';

export const name = EC_PROJECT_MANAGEMENT;

export const projectManagementReducer = handleActions(
  {
    [PROJECT_MANAGEMENT_SUCCESS]: (state, action) => {
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
