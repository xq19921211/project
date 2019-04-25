/**
 * Created by xu.long on 2018/6/5.
 */
import { createAction, Action } from 'redux-actions';
import {
  ADD_COMMODITY_CLASSIFY,
  ADD_COMMODITY_CLASSIFY_SUCCESS,
  ADD_COMMODITY_CLASSIFY_ERROR,
  ADD_COMMODITY_CLASSIFY_FAILED,
  INIT,
  COMMODITY_CLASSIFY_DETAIL,
  COMMODITY_CLASSIFY_DETAIL_SUCCESS,
  COMMODITY_CLASSIFY_DETAIL_FAILED,
  COMMODITY_CLASSIFY_DETAIL_ERROR,
} from './constant';

export const submit = createAction(ADD_COMMODITY_CLASSIFY);
export const submitSuccess = createAction(ADD_COMMODITY_CLASSIFY_SUCCESS);
export const submitError = createAction(ADD_COMMODITY_CLASSIFY_ERROR);
export const submitFailed = createAction(ADD_COMMODITY_CLASSIFY_FAILED);

export const init = createAction(INIT);

export const initCommodityClassifyDetail = createAction(
  COMMODITY_CLASSIFY_DETAIL,
);
export const initCommodityClassifyDetailSuccess = createAction(
  COMMODITY_CLASSIFY_DETAIL_SUCCESS,
);
export const initCommodityClassifyDetailError = createAction(
  COMMODITY_CLASSIFY_DETAIL_ERROR,
);
export const initCommodityClassifyDetailFailed = createAction(
  COMMODITY_CLASSIFY_DETAIL_FAILED,
);
