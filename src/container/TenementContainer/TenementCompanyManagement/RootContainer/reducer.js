/**
 * Created by xu.long on 2018/5/26.
 */
import { EC_TENEMENT_COMPANY_MANAGEMENT } from '../../../../constant';
import { TENEMENT_COMPANY_MANAGEMENT_SUCCESS } from './constant';
import { handleActions } from 'redux-actions';

export const name = EC_TENEMENT_COMPANY_MANAGEMENT;

export const tenementCompanyReducer = handleActions(
  {
    [TENEMENT_COMPANY_MANAGEMENT_SUCCESS]: (state, action) => {
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
