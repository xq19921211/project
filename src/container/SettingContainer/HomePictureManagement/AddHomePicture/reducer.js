/**
 * Created by xu.long on 2018/6/23.
 */
import { createAction, handleActions, Action } from 'redux-actions';
import { INIT, HOME_PICTURE_DETAIL_SUCCESS } from './constant';

import { EC_ADD_HOME_PICTURE } from '../../../../constant';

export const name = EC_ADD_HOME_PICTURE;

export const addHomePictureReducer = handleActions(
  {
    [INIT]: (state, action) => {
      return Object.assign({}, state, {
        detailData: {},
      });
    },
    [HOME_PICTURE_DETAIL_SUCCESS]: (state, action) => {
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
