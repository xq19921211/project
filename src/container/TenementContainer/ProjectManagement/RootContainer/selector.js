/**
 * Created by xu.long on 2018/5/16.
 */
import { createSelector } from 'reselect';

const data = state => state.projectManagementReducer.data;

export const getProjectList = createSelector([data], data => {
  return data;
});
