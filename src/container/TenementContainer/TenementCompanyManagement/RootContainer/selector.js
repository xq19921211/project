/**
 * Created by xu.long on 2018/5/26.
 */
import { createSelector } from 'reselect';

const data = state => state.tenementCompanyReducer.data;

export const getTenementCompanyList = createSelector([data], data => {
  return data;
});
