/**
 * Created by xu.long on 2018/5/16.
 */
import { createAction, Action } from 'redux-actions';
import {
  COMMODITY_CLASSIFY,
  COMMODITY_CLASSIFY_SUCCESS,
  COMMODITY_CLASSIFY_ERROR,
  COMMODITY_CLASSIFY_FAILED,
} from './constant';

export const initClassifyList = createAction(COMMODITY_CLASSIFY);
export const initClassifyListSuccess = createAction(COMMODITY_CLASSIFY_SUCCESS);
export const initClassifyListError = createAction(COMMODITY_CLASSIFY_ERROR);
export const initClassifyListFailed = createAction(COMMODITY_CLASSIFY_FAILED);
