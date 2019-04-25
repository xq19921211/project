/**
 * Created by xu.long on 2018/6/23.
 */
import { handleActions } from 'redux-actions';
import { EC_ROLE_MANAGEMENT } from '../../../../constant';
import { clone } from '../../../../util/util';
import {
  ADD_ROLE_MENU_SUCCESS,
  GET_ALL_USER_LIST_SUCCESS,
  MODIFY_LIST_STATUS_SUCCESS,
  ROLE_MANAGEMENT_SUCCESS,
  GET_MENU_LIST_BY_ROLE_ID_SUCCESS,
} from './constant';

export const name = EC_ROLE_MANAGEMENT;

export const roleManagementReducer = handleActions(
  {
    [ROLE_MANAGEMENT_SUCCESS]: (state, action) => {
      return {
        ...state,
        ...{
          data: action.payload.data,
        },
      };
    },
    [MODIFY_LIST_STATUS_SUCCESS]: (state, action) => {
      let temp = clone(state.data.dataSource);
      temp[action.payload.record.key].status = action.payload.record.status;
      let obj = Object.assign({}, state.data, {
        dataSource: temp,
      });
      return Object.assign({}, state, {
        data: obj,
      });
    },
    [GET_ALL_USER_LIST_SUCCESS]: (state, action) => {
      return {
        ...state,
        ...{
          allUserList: action.payload.data.dataSource,
        },
      };
    },
    [GET_MENU_LIST_BY_ROLE_ID_SUCCESS]: (state, action) => {
      return {
        ...state,
        ...{
          menuListByRoleId: action.payload.data,
        },
      };
    },
  },
  {
    data: {
      current: 1,
      dataSource: [],
      total: 0,
    },
    allUserList: [], // 用在分配人员上
    menuListByRoleId: [],
  },
);
