/**
 * Created by xu.long on 2018/5/26.
 */
import { createSelector } from 'reselect';

const data = state => state.tenementMemberDetailReducer.data;

export const getTenementMemberDetail = createSelector([data], data => {
  console.log('selector getTenementMemberDetail : ' + JSON.stringify(data));
  return data;
});
