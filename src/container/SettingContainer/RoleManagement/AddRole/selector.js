/**
 * Created by xu.long on 2018/6/23.
 */
import { createSelector } from 'reselect';

const detailData = state => state.addRoleReducer.detailData;

export const getRoleDetail = createSelector([detailData], detailData => {
  console.log('selector getRoleDetail : ' + JSON.stringify(detailData));
  return detailData;
});
