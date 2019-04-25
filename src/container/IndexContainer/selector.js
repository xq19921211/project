/**
 * Created by xu.long on 27/03/2018.
 */

import { createSelector } from 'reselect';

const data = state => state.getMenuListReducer.data;
const userInfo = state => state.getMenuListReducer.userInfo;

export const getMenuListResult = createSelector([data], data => {
  return data;
});
export const getUserInfoResult = createSelector([userInfo], userInfo => {
  return userInfo;
});
