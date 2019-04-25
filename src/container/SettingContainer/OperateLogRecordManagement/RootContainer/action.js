/**
 * Created by xu.long on 2018/6/23.
 */
import { createAction, Action } from 'redux-actions';
import {
  LOG_RECORD,
  LOG_RECORD_SUCCESS,
  LOG_RECORD_ERROR,
  LOG_RECORD_FAILED,
} from './constant';

export const initLogRecordList = createAction(LOG_RECORD);
export const initLogRecordListSuccess = createAction(LOG_RECORD_SUCCESS);
export const initLogRecordListError = createAction(LOG_RECORD_ERROR);
export const initLogRecordListFailed = createAction(LOG_RECORD_FAILED);
