/**
 * Created by xu.long on 2018/6/23.
 */
import { createAction } from 'redux-actions';
import {
  HOME_PICTURE_MANAGEMENT,
  HOME_PICTURE_MANAGEMENT_ERROR,
  HOME_PICTURE_MANAGEMENT_FAILED,
  HOME_PICTURE_MANAGEMENT_SUCCESS,
  MODIFY_LIST_STATUS,
  MODIFY_LIST_STATUS_ERROR,
  MODIFY_LIST_STATUS_FAILED,
  MODIFY_LIST_STATUS_SUCCESS,
} from './constant';

export const initHomePictureList = createAction(HOME_PICTURE_MANAGEMENT);
export const initHomePictureListSuccess = createAction(
  HOME_PICTURE_MANAGEMENT_SUCCESS,
);
export const initHomePictureListError = createAction(
  HOME_PICTURE_MANAGEMENT_ERROR,
);
export const initHomePictureListFailed = createAction(
  HOME_PICTURE_MANAGEMENT_FAILED,
);

export const modifyListStatus = createAction(MODIFY_LIST_STATUS);
export const modifyListStatusSuccess = createAction(MODIFY_LIST_STATUS_SUCCESS);
export const modifyListStatusError = createAction(MODIFY_LIST_STATUS_ERROR);
export const modifyListStatusFailed = createAction(MODIFY_LIST_STATUS_FAILED);
