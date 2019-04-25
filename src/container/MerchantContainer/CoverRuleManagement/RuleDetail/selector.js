/**
 * Created by xu.long on 2018/6/18.
 */
import { createSelector } from 'reselect';

const data = state => state.coverRuleDetailReducer.data;

export const getCoverRuleDetail = createSelector([data], data => {
  console.log('selector getCoverRuleDetail : ' + JSON.stringify(data));
  return data;
});
