/**
 * Created by xu.long on 2018/5/19.
 */
import { createSelector } from 'reselect';

const data = state => state.settingManagementReducer.data;

export const getSettingList = createSelector([data], data => {
  console.log('selector getSettingList : ' + JSON.stringify(data));
  return data;
});
