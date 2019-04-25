/**
 * Created by xu.long on 2018/6/18.
 */
import { createAction, handleActions, Action } from 'redux-actions';
import {
  ADD_BUILD_TEAM,
  ADD_BUILD_TEAM_SUCCESS,
  ADD_BUILD_TEAM_ERROR,
  ADD_BUILD_TEAM_FAILED,
  INIT,
  BUILD_TEAM_DETAIL,
  BUILD_TEAM_DETAIL_SUCCESS,
} from './constant';

import { EC_ADD_BUILD_TEAM } from '../../../../constant';

export const name = EC_ADD_BUILD_TEAM;

export const addBuildTeamReducer = handleActions(
  {
    [INIT]: (state, action) => {
      console.log(
        'addBuildTeamReducer INIT success action: ' + JSON.stringify(action),
      );
      return Object.assign({}, state, {
        buildTeamDetail: {},
      });
    },
    [BUILD_TEAM_DETAIL_SUCCESS]: (state, action) => {
      console.log(
        'addBuildTeamReducer BUILD_TEAM_DETAIL_SUCCESS success action: ' +
          JSON.stringify(action),
      );
      return Object.assign({}, state, {
        buildTeamDetail: action.payload.data,
      });
    },
  },
  {
    buildTeamDetail: {},
  },
);
