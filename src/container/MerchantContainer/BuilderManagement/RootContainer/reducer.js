/**
 * Created by xu.long on 2018/6/18.
 */
import { Action, createAction, handleActions } from 'redux-actions';
import {
  BUILDER,
  BUILDER_ERROR,
  BUILDER_FAILED,
  BUILDER_SUCCESS,
  MODIFY_LIST_STATUS_SUCCESS,
  DELETE_BUILDER_SUCCESS,
} from './constant';

import { EC_BUILDER } from '../../../../constant';
import { clone } from '../../../../util/util';

export const name = EC_BUILDER;

export const builderReducer = handleActions(
  {
    [BUILDER_SUCCESS]: (state, action) => {
      return Object.assign({}, state, {
        data: action.payload.data,
      });
    },
    [MODIFY_LIST_STATUS_SUCCESS]: (state, action) => {
      let temp = clone(state.data.dataSource);
      temp[action.payload.record.key].oprStatus = action.payload.record.status;
      // temp.splice(action.payload.record.key, 1, action.payload.record);
      let obj = Object.assign({}, state.data, {
        dataSource: temp,
      });
      return Object.assign({}, state, {
        data: obj,
      });
    },
    [DELETE_BUILDER_SUCCESS]: (state, action) => {
      let temp = clone(state.data.dataSource);
      temp[action.payload.record.key].oprStatus = action.payload.record.status;
      // temp.splice(action.payload.record.key, 1, action.payload.record);
      let obj = Object.assign({}, state.data, {
        dataSource: temp,
      });
      return Object.assign({}, state, {
        data: obj,
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
