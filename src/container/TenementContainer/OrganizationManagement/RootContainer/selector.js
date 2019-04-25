/**
 * Created by xu.long on 2018/5/19.
 */
import { createSelector } from 'reselect';

const data = state => state.organizationManagementReducer.data;

export const getOrganizationList = createSelector([data], data => {
  return data;
});
