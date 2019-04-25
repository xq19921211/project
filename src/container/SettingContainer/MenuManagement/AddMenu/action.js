/**
 * Created by xu.long on 2018/6/23.
 */
import { createAction, Action } from 'redux-actions';
import {
  ADD_MENU,
  ADD_MENU_SUCCESS,
  ADD_MENU_ERROR,
  ADD_MENU_FAILED,
  INIT,
  MENU_DETAIL,
  MENU_DETAIL_SUCCESS,
  MENU_DETAIL_FAILED,
  MENU_DETAIL_ERROR,
} from './constant';

export const submit = createAction(ADD_MENU);
export const submitSuccess = createAction(ADD_MENU_SUCCESS);
export const submitError = createAction(ADD_MENU_ERROR);
export const submitFailed = createAction(ADD_MENU_FAILED);

export const init = createAction(INIT);

export const initMenuDetail = createAction(MENU_DETAIL);
export const initMenuDetailSuccess = createAction(MENU_DETAIL_SUCCESS);
export const initMenuDetailError = createAction(MENU_DETAIL_ERROR);
export const initMenuDetailFailed = createAction(MENU_DETAIL_FAILED);
