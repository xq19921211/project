/**
 * Created by xu.long on 2018/6/23.
 */
import { handleActions } from 'redux-actions';
import { INIT, MENU_DETAIL_SUCCESS } from './constant';

import { EC_ADD_MENU } from '../../../../constant';

export const name = EC_ADD_MENU;

export const addMenuReducer = handleActions(
  {
    [INIT]: (state, action) => {
      return Object.assign({}, state, {
        detailData: {},
      });
    },
    [MENU_DETAIL_SUCCESS]: (state, action) => {
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
