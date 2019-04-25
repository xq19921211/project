/**
 * Created by xu.long on 2018/5/18.
 */
import { createSelector } from 'reselect';

const data = state => state.addDepartmentReducer.data;
const detailData = state => state.addDepartmentReducer.detailData;

export const getIceList = createSelector([data], data => {
  return data;
});

export const getDepartmentDetail = createSelector([detailData], detailData => {
  return detailData;
});
