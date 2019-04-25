/**
 * Created by xu.long on 2018/5/16.
 */
import { createSelector } from 'reselect';

const data = state => state.commodityManagementReducer.data;
const treeData = state => state.commodityManagementReducer.treeData;

export const getCommodityList = createSelector([data], data => {
  return data;
});
export const getTreeList = createSelector([treeData], treeData => {
  return treeData;
});
