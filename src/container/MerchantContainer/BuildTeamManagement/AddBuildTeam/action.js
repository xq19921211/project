/**
 * Created by xu.long on 2018/6/18.
 */
import { createAction, Action } from 'redux-actions';
import {
  ADD_BUILD_TEAM,
  ADD_BUILD_TEAM_SUCCESS,
  ADD_BUILD_TEAM_ERROR,
  ADD_BUILD_TEAM_FAILED,
  INIT,
  BUILD_TEAM_DETAIL,
  BUILD_TEAM_DETAIL_SUCCESS,
  BUILD_TEAM_DETAIL_FAILED,
  BUILD_TEAM_DETAIL_ERROR,
} from './constant';

export const submit = createAction(ADD_BUILD_TEAM);
export const submitSuccess = createAction(ADD_BUILD_TEAM_SUCCESS);
export const submitError = createAction(ADD_BUILD_TEAM_ERROR);
export const submitFailed = createAction(ADD_BUILD_TEAM_FAILED);

export const init = createAction(INIT);

export const initBuildTeamDetail = createAction(BUILD_TEAM_DETAIL);
export const initBuildTeamDetailSuccess = createAction(
  BUILD_TEAM_DETAIL_SUCCESS,
);
export const initBuildTeamDetailError = createAction(BUILD_TEAM_DETAIL_ERROR);
export const initBuildTeamDetailFailed = createAction(BUILD_TEAM_DETAIL_FAILED);
