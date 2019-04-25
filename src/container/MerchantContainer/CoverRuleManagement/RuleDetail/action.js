/**
 * Created by xu.long on 2018/6/18.
 */
import { createAction, Action } from 'redux-actions';
import {
  COVER_RULE_DETAIL,
  COVER_RULE_DETAIL_SUCCESS,
  COVER_RULE_DETAIL_ERROR,
  COVER_RULE_DETAIL_FAILED,
} from './constant';

export const initCoverRuleDetail = createAction(COVER_RULE_DETAIL);
export const initCoverRuleDetailSuccess = createAction(
  COVER_RULE_DETAIL_SUCCESS,
);
export const initCoverRuleDetailError = createAction(COVER_RULE_DETAIL_ERROR);
export const initCoverRuleDetailFailed = createAction(COVER_RULE_DETAIL_FAILED);
