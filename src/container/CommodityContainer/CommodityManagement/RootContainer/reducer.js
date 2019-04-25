/**
 * Created by xu.long on 2018/5/16.
 */
import { Action, createAction, handleActions } from 'redux-actions';
import {
  COMMODITY_MANAGEMENT,
  COMMODITY_MANAGEMENT_ERROR,
  COMMODITY_MANAGEMENT_FAILED,
  COMMODITY_MANAGEMENT_SUCCESS,
  MODIFY_LIST_STATUS,
  MODIFY_LIST_STATUS_ERROR,
  MODIFY_LIST_STATUS_FAILED,
  MODIFY_LIST_STATUS_SUCCESS,
  TREE,
  TREE_ERROR,
  TREE_FAILED,
  TREE_SUCCESS,
} from './constant';

import { EC_COMMODITY_MANAGEMENT } from '../../../../constant';
import { clone } from '../../../../util/util';

export const name = EC_COMMODITY_MANAGEMENT;

export const commodityManagementReducer = handleActions(
  {
    [COMMODITY_MANAGEMENT_SUCCESS]: (state, action) => {
      return Object.assign({}, state, {
        data: action.payload.data,
      });
    },
    [TREE_SUCCESS]: (state, action) => {
      let temp = clone(action.payload.data);
      temp.unshift({
        cat_id: '',
        cat_name: '--全部--',
      });
      return Object.assign({}, state, {
        treeData: temp,
      });
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
  },
  {
    data: {
      current: 1,
      dataSource: [],
      total: 0,
    },
    treeData: [],
  },
);
