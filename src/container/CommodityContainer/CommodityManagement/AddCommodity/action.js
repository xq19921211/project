/**
 * Created by xu.long on 2018/5/20.
 */
import { createAction, Action } from 'redux-actions';
import {
  ADD_COMMODITY,
  ADD_COMMODITY_SUCCESS,
  ADD_COMMODITY_ERROR,
  ADD_COMMODITY_FAILED,
  INIT_UNIT,
  INIT_UNIT_SUCCESS,
  INIT_UNIT_ERROR,
  INIT_UNIT_FAILED,
} from './constant';

export const submit = createAction(ADD_COMMODITY);
export const submitSuccess = createAction(ADD_COMMODITY_SUCCESS);
export const submitError = createAction(ADD_COMMODITY_ERROR);
export const submitFailed = createAction(ADD_COMMODITY_FAILED);

export const initUnit = createAction(INIT_UNIT);
export const initUnitSuccess = createAction(INIT_UNIT_SUCCESS);
export const initUnitError = createAction(INIT_UNIT_ERROR);
export const initUnitFailed = createAction(INIT_UNIT_FAILED);
