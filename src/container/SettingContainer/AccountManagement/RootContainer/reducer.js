/**
 * Created by xu.long on 2018/5/19.
 */
import { createAction, handleActions, Action } from 'redux-actions';
import {
  SETTING_MANAGEMENT,
  SETTING_MANAGEMENT_SUCCESS,
  SETTING_MANAGEMENT_ERROR,
  SETTING_MANAGEMENT_FAILED,
  MODIFY_LIST_STATUS_SUCCESS,
  DELETE_ACCOUNT_SUCCESS,
} from './constant';

import { EC_SETTING_MANAGEMENT } from '../../../../constant';
import { clone } from '../../../../util/util';

export const name = EC_SETTING_MANAGEMENT;

export const settingManagementReducer = handleActions(
  {
    [SETTING_MANAGEMENT_SUCCESS]: (state, action) => {
      console.log(
        'settingManagementReducer SETTING_MANAGEMENT_SUCCESS success action: ' +
          JSON.stringify(action),
      );
      return Object.assign({}, state, {
        data: action.payload.data,
      });
    },
    [MODIFY_LIST_STATUS_SUCCESS]: (state, action) => {
      console.log(
        'settingManagementReducer MODIFY_LIST_STATUS_SUCCESS success action: ' +
          JSON.stringify(action),
      );
      let temp = clone(state.data.dataSource);
      temp[action.payload.record.key].status = action.payload.record.status;
      // temp.splice(action.payload.record.key, 1, action.payload.record);
      let obj = Object.assign({}, state.data, {
        dataSource: temp,
      });
      return Object.assign({}, state, {
        data: obj,
      });
    },
    [DELETE_ACCOUNT_SUCCESS]: (state, action) => {
      console.log(
        'settingManagementReducer DELETE_ACCOUNT_SUCCESS success action: ' +
          JSON.stringify(action),
      );
      let temp = clone(state.data.dataSource);
      temp[action.payload.record.key].status = action.payload.record.status;
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
