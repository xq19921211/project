/**
 * Created by xu.long on 2018/5/25.
 */
import { handleActions } from 'redux-actions';
import { EC_ADD_TENEMENT } from '../../../../constant';
import {
  ADD_TENEMENT_SUCCESS,
  INIT,
  TENEMENT_DETAIL_SUCCESS,
} from './constant';

export const name = EC_ADD_TENEMENT;

export const addTenementReducer = handleActions(
  {
    [ADD_TENEMENT_SUCCESS]: (state, action) => {
      return Object.assign({}, state, {
        data: action.payload.data,
      });
    },
    [INIT]: (state, action) => {
      return Object.assign({}, state, {
        detailData: {},
      });
    },
    [TENEMENT_DETAIL_SUCCESS]: (state, action) => {
      return Object.assign({}, state, {
        detailData: action.payload.data,
      });
    },
  },
  {
    data: {},
    detailData: {},
  },
);
