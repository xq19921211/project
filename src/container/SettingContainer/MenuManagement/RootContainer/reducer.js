/**
 * Created by xu.long on 2018/6/23.
 */
import { Action, createAction, handleActions } from 'redux-actions';
import { EC_MENU_MANAGEMENT } from '../../../../constant';
import { clone } from '../../../../util/util';
import {
  MENU_MANAGEMENT,
  MENU_MANAGEMENT_ERROR,
  MENU_MANAGEMENT_FAILED,
  MENU_MANAGEMENT_SUCCESS,
  MODIFY_LIST_STATUS_SUCCESS,
} from './constant';

export const name = EC_MENU_MANAGEMENT;

export const menuManagementReducer = handleActions(
  {
    [MENU_MANAGEMENT_SUCCESS]: (state, action) => {
      console.log(
        'menuManagementReducer MENU_MANAGEMENT_SUCCESS success action: ' +
          JSON.stringify(action),
      );
      return Object.assign({}, state, {
        data: action.payload.data,
      });
    },
    [MODIFY_LIST_STATUS_SUCCESS]: (state, action) => {
      // console.log('commodityManagementReducer MODIFY_LIST_STATUS_SUCCESS success action: ' + JSON.stringify(action));
      const lookFor = (data, record) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].menuId === record.id) {
            data[i].menuStatus = record.status;
          } else if (data[i].chrildren.length > 0) {
            lookFor(data[i].chrildren, record);
          }
        }
        return data;
      };
      let temp = clone(state.data.dataSource);

      temp = lookFor(temp, action.payload.record);
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
