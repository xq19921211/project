/**
 * Created by xu.long on 2018/5/25.
 */
import { handleActions } from 'redux-actions';
import { EC_ADD_DEPARTMENT } from '../../../../constant';
import { DEPARTMENT_DETAIL_SUCCESS, ICE_LIST_SUCCESS, INIT } from './constant';

export const name = EC_ADD_DEPARTMENT;

export const addDepartmentReducer = handleActions(
  {
    [ICE_LIST_SUCCESS]: (state, action) => {
      return Object.assign({}, state, {
        data: action.payload.data,
      });
    },
    [INIT]: (state, action) => {
      return Object.assign({}, state, {
        detailData: {},
      });
    },
    [DEPARTMENT_DETAIL_SUCCESS]: (state, action) => {
      return Object.assign({}, state, {
        detailData: action.payload.data,
      });
    },
  },
  {
    data: {
      currentPage: 1,
      content: [],
      totalRecord: 0,
    },
    detailData: {},
  },
);
