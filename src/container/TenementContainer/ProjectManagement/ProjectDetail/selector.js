/**
 * Created by xu.long on 2018/5/26.
 */
import { createSelector } from 'reselect';

const data = state => state.projectDetailReducer.data;
const areaProList = state => state.projectDetailReducer.areaProList;

export const getProjectDetail = createSelector([data], data => {
  return data;
});
export const getAreaProList = createSelector([areaProList], areaProList => {
  return areaProList;
});
