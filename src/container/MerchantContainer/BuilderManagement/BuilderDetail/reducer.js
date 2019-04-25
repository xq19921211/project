/**
 * Created by xu.long on 2018/6/18.
 */
import { createAction, handleActions, Action } from 'redux-actions';
import {
  BUILDER_DETAIL,
  BUILDER_DETAIL_SUCCESS,
  BUILDER_DETAIL_ERROR,
  BUILDER_DETAIL_FAILED,
  INIT,
} from './constant';

import { EC_BUILDER_DETAIL } from '../../../../constant';

export const name = EC_BUILDER_DETAIL;

export const builderDetailReducer = handleActions(
  {
    [BUILDER_DETAIL_SUCCESS]: (state, action) => {
      console.log(
        'builderDetailReducer BUILDER_DETAIL_SUCCESS success action: ' +
          JSON.stringify(action),
      );
      return Object.assign({}, state, {
        data: action.payload.data,
      });
    },
    [INIT]: (state, action) => {
      console.log(
        'builderDetailReducer INIT success action: ' + JSON.stringify(action),
      );
      return Object.assign({}, state, {
        data: {},
      });
    },
  },
  {
    data: {},
  },
);
