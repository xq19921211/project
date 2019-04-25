/**
 * Created by xu.long on 2018/6/18.
 */
import { createAction, handleActions, Action } from 'redux-actions';
import {
  ADD_BUILDER,
  ADD_BUILDER_SUCCESS,
  ADD_BUILDER_ERROR,
  ADD_BUILDER_FAILED,
} from './constant';

import { EC_ADD_BUILDER } from '../../../../constant';

export const name = EC_ADD_BUILDER;

export const addBuilderReducer = handleActions(
  {
    [ADD_BUILDER_SUCCESS]: (state, action) => {
      console.log(
        'addBuilderReducer ADD_BUILDER_SUCCESS success action: ' +
          JSON.stringify(action),
      );
      return Object.assign({}, state, {
        data: action.payload.data,
      });
    },
  },
  {
    data: {},
  },
);
