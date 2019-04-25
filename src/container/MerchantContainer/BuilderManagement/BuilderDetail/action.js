/**
 * Created by xu.long on 2018/6/18.
 */
import { createAction, Action } from 'redux-actions';
import {
  BUILDER_DETAIL,
  BUILDER_DETAIL_SUCCESS,
  BUILDER_DETAIL_ERROR,
  BUILDER_DETAIL_FAILED,
  INIT,
} from './constant';

export const initBuilderDetail = createAction(BUILDER_DETAIL);
export const initBuilderDetailSuccess = createAction(BUILDER_DETAIL_SUCCESS);
export const initBuilderDetailError = createAction(BUILDER_DETAIL_ERROR);
export const initBuilderDetailFailed = createAction(BUILDER_DETAIL_FAILED);

export const init = createAction(INIT);
