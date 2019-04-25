/**
 * Created by xu.long on 2018/5/19.
 */
import { createAction, Action } from 'redux-actions';
import { ORDER, ORDER_SUCCESS, ORDER_ERROR, ORDER_FAILED } from './constant';

export const initOrderList = createAction(ORDER);
export const initOrderListSuccess = createAction(ORDER_SUCCESS);
export const initOrderListError = createAction(ORDER_ERROR);
export const initOrderListFailed = createAction(ORDER_FAILED);
