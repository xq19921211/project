/**
 * Created by xu.long on 2018/6/18.
 */
import { createAction, handleActions, Action } from 'redux-actions';
import {
  BUILD_TEAM_MANAGEMENT,
  BUILD_TEAM_MANAGEMENT_SUCCESS,
  BUILD_TEAM_MANAGEMENT_ERROR,
  BUILD_TEAM_MANAGEMENT_FAILED,
  MODIFY_LIST_STATUS_SUCCESS,
} from './constant';

import { EC_BUILD_TEAM_MANAGEMENT } from '../../../../constant';
import { clone } from '../../../../util/util';

export const name = EC_BUILD_TEAM_MANAGEMENT;

export const buildTeamManagementReducer = handleActions(
  {
    [BUILD_TEAM_MANAGEMENT_SUCCESS]: (state, action) => {
      console.log(
        'buildTeamManagementReducer BUILD_TEAM_MANAGEMENT_SUCCESS success action: ' +
          JSON.stringify(action),
      );
      return Object.assign({}, state, {
        data: action.payload.data,
      });
    },
    [MODIFY_LIST_STATUS_SUCCESS]: (state, action) => {
      console.log(
        'buildTeamManagementReducer MODIFY_LIST_STATUS_SUCCESS success action: ' +
          JSON.stringify(action),
      );
      let temp = clone(state.data.dataSource);
      temp[action.payload.record.key].team_status =
        action.payload.record.status;
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
