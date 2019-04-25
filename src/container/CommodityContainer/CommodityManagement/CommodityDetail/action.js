/**
 * Created by xu.long on 2018/5/21.
 */
import { createAction, Action } from 'redux-actions';
import {
  INIT,
  COMMODITY_DETAIL,
  COMMODITY_DETAIL_SUCCESS,
  COMMODITY_DETAIL_ERROR,
  COMMODITY_DETAIL_FAILED,
} from './constant';

export const initCommodityDetail = createAction(COMMODITY_DETAIL);
export const initCommodityDetailSuccess = createAction(
  COMMODITY_DETAIL_SUCCESS,
);
export const initCommodityDetailError = createAction(COMMODITY_DETAIL_ERROR);
export const initCommodityDetailFailed = createAction(COMMODITY_DETAIL_FAILED);

export const init = createAction(INIT);
