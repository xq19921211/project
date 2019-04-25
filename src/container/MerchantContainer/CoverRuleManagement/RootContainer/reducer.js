/**
 * Created by xu.long on 2018/6/18.
 */
import { createAction, handleActions, Action } from 'redux-actions';
import {
  COVER_RULE,
  COVER_RULE_SUCCESS,
  COVER_RULE_ERROR,
  COVER_RULE_FAILED,
} from './constant';

import { EC_COVER_RULE } from '../../../../constant';

export const name = EC_COVER_RULE;

export const coverRuleReducer = handleActions(
  {
    [COVER_RULE_SUCCESS]: (state, action) => {
      console.log(
        'coverRuleReducer COVER_RULE_SUCCESS success action: ' +
          JSON.stringify(action),
      );
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
