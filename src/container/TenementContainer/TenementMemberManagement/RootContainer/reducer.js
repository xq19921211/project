/**
 * Created by xu.long on 2018/5/19.
 */
import { createAction, handleActions, Action } from 'redux-actions';
import {
  TENEMENT_MEMBER,
  TENEMENT_MEMBER_SUCCESS,
  TENEMENT_MEMBER_ERROR,
  TENEMENT_MEMBER_FAILED,
  MODIFY_LIST_STATUS,
  MODIFY_LIST_STATUS_SUCCESS,
  MODIFY_LIST_STATUS_ERROR,
  MODIFY_LIST_STATUS_FAILED,
} from './constant';

import { EC_TENEMENT_MEMBER } from '../../../../constant';
import { clone } from '../../../../util/util';

export const name = EC_TENEMENT_MEMBER;

export const tenementMemberReducer = handleActions(
  {
    [TENEMENT_MEMBER_SUCCESS]: (state, action) => {
      console.log(
        'tenementMemberReducer TENEMENT_MEMBER_SUCCESS success action: ' +
          JSON.stringify(action),
      );
      return Object.assign({}, state, {
        data: action.payload.data,
      });
    },
    [MODIFY_LIST_STATUS_SUCCESS]: (state, action) => {
      console.log(
        'tenementMemberReducer MODIFY_LIST_STATUS_SUCCESS success action: ' +
          JSON.stringify(action),
      );
      let temp = clone(state.data.dataSource);
      temp[action.payload.record.key].status = action.payload.record.status;
      // temp.splice(action.payload.record.key, 1, action.payload.record);
      let obj = Object.assign({}, state.data, {
        dataSource: temp,
      });
      return Object.assign({}, state, {
        data: obj,
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
