/**
 * Created by xu.long on 2018/6/23.
 */
import { createAction, Action } from 'redux-actions';
import {
  ADD_HOME_PICTURE,
  ADD_HOME_PICTURE_SUCCESS,
  ADD_HOME_PICTURE_ERROR,
  ADD_HOME_PICTURE_FAILED,
  INIT,
  HOME_PICTURE_DETAIL,
  HOME_PICTURE_DETAIL_SUCCESS,
  HOME_PICTURE_DETAIL_FAILED,
  HOME_PICTURE_DETAIL_ERROR,
} from './constant';

export const submit = createAction(ADD_HOME_PICTURE);
export const submitSuccess = createAction(ADD_HOME_PICTURE_SUCCESS);
export const submitError = createAction(ADD_HOME_PICTURE_ERROR);
export const submitFailed = createAction(ADD_HOME_PICTURE_FAILED);

export const init = createAction(INIT);

export const initHomePictureDetail = createAction(HOME_PICTURE_DETAIL);
export const initHomePictureDetailSuccess = createAction(
  HOME_PICTURE_DETAIL_SUCCESS,
);
export const initHomePictureDetailError = createAction(
  HOME_PICTURE_DETAIL_ERROR,
);
export const initHomePictureDetailFailed = createAction(
  HOME_PICTURE_DETAIL_FAILED,
);
