/**
 * Created by xu.long on 26/03/2018.
 */
import { createAction, Action } from 'redux-actions';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_FAILED,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_FAILED,
  GET_CONFIG,
} from './constant';

export const login = createAction(LOGIN);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginError = createAction(LOGIN_ERROR);
export const loginFailed = createAction(LOGIN_FAILED);

export const logout = createAction(LOGOUT);
export const logoutSuccess = createAction(LOGOUT_SUCCESS);
export const logoutError = createAction(LOGOUT_ERROR);
export const logoutFailed = createAction(LOGOUT_FAILED);

export const getConfig = createAction(GET_CONFIG);
