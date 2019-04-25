/**
 * Created by xu.long on 2018/6/23.
 */
import { createSelector } from 'reselect';

const data = state => state.menuManagementReducer.data;

export const getMenuList = createSelector([data], data => {
  console.log('selector getMenuList : ' + JSON.stringify(data));
  return data;
});
