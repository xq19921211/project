/**
 * Created by xu.long on 2018/5/19.
 */
import { createAction } from 'redux-actions';
import {
  ORGANIZATION_MANAGEMENT,
  ORGANIZATION_MANAGEMENT_ERROR,
  ORGANIZATION_MANAGEMENT_FAILED,
  ORGANIZATION_MANAGEMENT_SUCCESS,
} from './constant';

export const initOrganizationList = createAction(ORGANIZATION_MANAGEMENT);
export const initOrganizationListSuccess = createAction(
  ORGANIZATION_MANAGEMENT_SUCCESS,
);
export const initOrganizationListError = createAction(
  ORGANIZATION_MANAGEMENT_ERROR,
);
export const initOrganizationListFailed = createAction(
  ORGANIZATION_MANAGEMENT_FAILED,
);
