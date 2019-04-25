/**
 * Created by xu.long on 2018/5/19.
 */
import { createSelector } from 'reselect';

const data = state => state.tenementMemberReducer.data;

export const getTenementMemberList = createSelector([data], data => {
  console.log('selector getTenementMemberList : ' + JSON.stringify(data));
  return data;
});
