/**
 * Created by xu.long on 2018/5/27.
 */
import { createAction, Action } from 'redux-actions';
import {
  ACCOUNT_DETAIL,
  ACCOUNT_DETAIL_SUCCESS,
  ACCOUNT_DETAIL_ERROR,
  ACCOUNT_DETAIL_FAILED,
  INIT,
} from './constant';

export const initAccountDetail = createAction(ACCOUNT_DETAIL);
export const initAccountDetailSuccess = createAction(ACCOUNT_DETAIL_SUCCESS);
export const initAccountDetailError = createAction(ACCOUNT_DETAIL_ERROR);
export const initAccountDetailFailed = createAction(ACCOUNT_DETAIL_FAILED);

export const init = createAction(INIT);
