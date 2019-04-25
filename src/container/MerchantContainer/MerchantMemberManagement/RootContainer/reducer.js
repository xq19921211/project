/**
 * Created by xu.long on 2018/5/18.
 */
import { createAction, handleActions, Action } from 'redux-actions';
import {
  MERCHANT_MEMBER,
  MERCHANT_MEMBER_SUCCESS,
  MERCHANT_MEMBER_ERROR,
  MERCHANT_MEMBER_FAILED,
  // ROLE_SUCCESS
  MODIFY_LIST_STATUS_SUCCESS,
  DELETE_MERCHANTMEMBER_SUCCESS
} from './constant';

import { EC_MERCHANT_MEMBER } from '../../../../constant';
import { clone } from '../../../../util/util';

export const name = EC_MERCHANT_MEMBER;

export const merchantMemberReducer = handleActions(
  {
    [MERCHANT_MEMBER_SUCCESS]: (state, action) => {
      console.log(
        'merchantMemberReducer MERCHANT_MEMBER success action: ' +
          JSON.stringify(action),
      );
      return Object.assign({}, state, {
        data: action.payload.data,
      });
    },
    // [ROLE_SUCCESS]: (state, action) => {
    //     console.log('merchantMemberReducer ROLE success action: ' + JSON.stringify(action));
    //     return Object.assign({}, state, {
    //         roleData: action.payload.data
    //     });
    // }
    [MODIFY_LIST_STATUS_SUCCESS]: (state, action) => {
      console.log(
        'merchantMemberReducer MODIFY_LIST_STATUS_SUCCESS success action: ' +
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

    [DELETE_MERCHANTMEMBER_SUCCESS]: (state, action) => {
      console.log(
        'merchantMemberReducer DELETE_MERCHANTMEMBER_SUCCESS success action: ' +
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
    // roleData: {
    //     current: 1,
    //     dataSource: [],
    //     total: 0
    // }
  },
);
