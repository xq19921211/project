/**
 * Created by xu.long on 2018/5/26.
 */
import { createAction, Action } from 'redux-actions';
import {
  ADD_PROJECT,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_ERROR,
  ADD_PROJECT_FAILED,
} from './constant';

export const submit = createAction(ADD_PROJECT);
export const submitSuccess = createAction(ADD_PROJECT_SUCCESS);
export const submitError = createAction(ADD_PROJECT_ERROR);
export const submitFailed = createAction(ADD_PROJECT_FAILED);
