/**
 * Created by xu.long on 2018/5/26.
 */
import { createAction, Action } from 'redux-actions';
import {
  PROJECT_DETAIL,
  PROJECT_DETAIL_SUCCESS,
  PROJECT_DETAIL_ERROR,
  PROJECT_DETAIL_FAILED,
  INIT,
  AREA_PRO_LIST,
  AREA_PRO_LIST_SUCCESS,
  AREA_PRO_LIST_ERROR,
  AREA_PRO_LIST_FAILED,
} from './constant';

export const initProjectDetail = createAction(PROJECT_DETAIL);
export const initProjectDetailSuccess = createAction(PROJECT_DETAIL_SUCCESS);
export const initProjectDetailError = createAction(PROJECT_DETAIL_ERROR);
export const initProjectDetailFailed = createAction(PROJECT_DETAIL_FAILED);

export const init = createAction(INIT);

export const initAreProjectList = createAction(AREA_PRO_LIST);
export const initAreProjectListSuccess = createAction(AREA_PRO_LIST_SUCCESS);
export const initAreProjectListError = createAction(AREA_PRO_LIST_ERROR);
export const initAreProjectListFailed = createAction(AREA_PRO_LIST_FAILED);
