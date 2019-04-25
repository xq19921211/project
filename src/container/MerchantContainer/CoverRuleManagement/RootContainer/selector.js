/**
 * Created by xu.long on 2018/6/18.
 */
import { createSelector } from 'reselect';

const data = state => state.coverRuleReducer.data;

export const getCoverRuleList = createSelector([data], data => {
  console.log('selector getCoverRuleList : ' + JSON.stringify(data));
  return data;
});
