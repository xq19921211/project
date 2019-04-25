/**
 * Created by xu.long on 2018/6/18.
 */
import { createAction, Action } from 'redux-actions';
import {
  BUILD_TEAM_MANAGEMENT,
  BUILD_TEAM_MANAGEMENT_SUCCESS,
  BUILD_TEAM_MANAGEMENT_ERROR,
  BUILD_TEAM_MANAGEMENT_FAILED,
  MODIFY_LIST_STATUS,
  MODIFY_LIST_STATUS_SUCCESS,
  MODIFY_LIST_STATUS_ERROR,
  MODIFY_LIST_STATUS_FAILED,
} from './constant';

export const initBuildTeamList = createAction(BUILD_TEAM_MANAGEMENT);
export const initBuildTeamListSuccess = createAction(
  BUILD_TEAM_MANAGEMENT_SUCCESS,
);
export const initBuildTeamListError = createAction(BUILD_TEAM_MANAGEMENT_ERROR);
export const initBuildTeamListFailed = createAction(
  BUILD_TEAM_MANAGEMENT_FAILED,
);

export const modifyListStatus = createAction(MODIFY_LIST_STATUS);
export const modifyListStatusSuccess = createAction(MODIFY_LIST_STATUS_SUCCESS);
export const modifyListStatusError = createAction(MODIFY_LIST_STATUS_ERROR);
export const modifyListStatusFailed = createAction(MODIFY_LIST_STATUS_FAILED);
