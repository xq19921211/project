/**
 * Created by xu.long on 2018/6/23.
 */
import { createAction, handleActions, Action } from 'redux-actions';
import {
  LOG_RECORD,
  LOG_RECORD_SUCCESS,
  LOG_RECORD_ERROR,
  LOG_RECORD_FAILED,
} from './constant';

import { EC_LOGIN_LOG_RECORD } from '../../../../constant';

export const name = EC_LOGIN_LOG_RECORD;

export const loginLogRecordReducer = handleActions(
  {
    [LOG_RECORD_SUCCESS]: (state, action) => {
      console.log(
        'logRecordReducer LOG_RECORD_SUCCESS success action: ' +
          JSON.stringify(action),
      );
      return Object.assign({}, state, {
        data: action.payload.data,
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
