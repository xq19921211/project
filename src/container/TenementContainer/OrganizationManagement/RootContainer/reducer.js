/**
 * Created by xu.long on 2018/5/19.
 */
import { handleActions } from 'redux-actions';
import { EC_ORGANIZATION_MANAGEMENT } from '../../../../constant';
import { ORGANIZATION_MANAGEMENT_SUCCESS } from './constant';

export const name = EC_ORGANIZATION_MANAGEMENT;

export const organizationManagementReducer = handleActions(
  {
    [ORGANIZATION_MANAGEMENT_SUCCESS]: (state, action) => {
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
