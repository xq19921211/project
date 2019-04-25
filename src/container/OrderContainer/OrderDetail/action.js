/**
 * Created by xu.long on 2018/5/22.
 */
import { createAction, Action } from 'redux-actions';
import {
  ORDER_DETAIL,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_ERROR,
  ORDER_DETAIL_FAILED,
} from './constant';

export const initOrderDetail = createAction(ORDER_DETAIL);
export const initOrderDetailSuccess = createAction(ORDER_DETAIL_SUCCESS);
export const initOrderDetailError = createAction(ORDER_DETAIL_ERROR);
export const initOrderDetailFailed = createAction(ORDER_DETAIL_FAILED);
