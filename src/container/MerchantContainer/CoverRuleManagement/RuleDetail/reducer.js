/**
 * Created by xu.long on 2018/6/18.
 */
import { createAction, handleActions, Action } from 'redux-actions';
import {
  COVER_RULE_DETAIL,
  COVER_RULE_DETAIL_SUCCESS,
  COVER_RULE_DETAIL_ERROR,
  COVER_RULE_DETAIL_FAILED,
} from './constant';

import { EC_COVER_RULE_DETAIL } from '../../../../constant';

export const name = EC_COVER_RULE_DETAIL;

export const coverRuleDetailReducer = handleActions(
  {
    [COVER_RULE_DETAIL_SUCCESS]: (state, action) => {
      console.log(
        'coverRuleDetailReducer COVER_RULE_DETAIL_SUCCESS success action: ' +
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
