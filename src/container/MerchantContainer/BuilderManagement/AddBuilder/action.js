/**
 * Created by xu.long on 2018/6/18.
 */
import { createAction, Action } from 'redux-actions';
import {
  ADD_BUILDER,
  ADD_BUILDER_SUCCESS,
  ADD_BUILDER_ERROR,
  ADD_BUILDER_FAILED,
} from './constant';

export const submit = createAction(ADD_BUILDER);
export const submitSuccess = createAction(ADD_BUILDER_SUCCESS);
export const submitError = createAction(ADD_BUILDER_ERROR);
export const submitFailed = createAction(ADD_BUILDER_FAILED);
