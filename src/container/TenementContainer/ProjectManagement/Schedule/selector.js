import { ProjectManagementScheduleReducerName } from './reducer';
import { createSelector } from 'reselect';

export const getScheduleDetailListSelect = createSelector(
  state => state[ProjectManagementScheduleReducerName].scheduleDetailList,
  data => data,
);
