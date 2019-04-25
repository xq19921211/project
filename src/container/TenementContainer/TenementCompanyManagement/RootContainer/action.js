/**
 * Created by xu.long on 2018/5/26.
 */
import { createAction } from 'redux-actions';
import {
  TENEMENT_COMPANY_MANAGEMENT,
  TENEMENT_COMPANY_MANAGEMENT_ERROR,
  TENEMENT_COMPANY_MANAGEMENT_FAILED,
  TENEMENT_COMPANY_MANAGEMENT_SUCCESS,
} from './constant';

export const initTenementCompanyList = createAction(
  TENEMENT_COMPANY_MANAGEMENT,
);
export const initTenementCompanyListSuccess = createAction(
  TENEMENT_COMPANY_MANAGEMENT_SUCCESS,
);
export const initTenementCompanyListError = createAction(
  TENEMENT_COMPANY_MANAGEMENT_ERROR,
);
export const initTenementCompanyListFailed = createAction(
  TENEMENT_COMPANY_MANAGEMENT_FAILED,
);
