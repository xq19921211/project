/**
 * Created by xu.long on 2018/6/18.
 */
import { createAction, Action } from 'redux-actions';
import {
  COVER_RULE,
  COVER_RULE_SUCCESS,
  COVER_RULE_ERROR,
  COVER_RULE_FAILED,
} from './constant';

export const initCoverRuleList = createAction(COVER_RULE);
export const initCoverRuleListSuccess = createAction(COVER_RULE_SUCCESS);
export const initCoverRuleListError = createAction(COVER_RULE_ERROR);
export const initCoverRuleListFailed = createAction(COVER_RULE_FAILED);
