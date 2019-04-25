/**
 * Created by xu.long on 2018/6/18.
 */
import { createSelector } from 'reselect';

const data = state => state.buildTeamManagementReducer.data;

export const getBuildTeamList = createSelector([data], data => {
  console.log('selector getBuildTeamList : ' + JSON.stringify(data));
  return data;
});
