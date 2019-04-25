/**
 * Created by xu.long on 2018/6/6.
 */
import { createSelector } from 'reselect';

const data = state => state.merchantMemberDetailReducer.data;

export const getMerchantMemberDetail = createSelector([data], data => {
  console.log('selector getMerchantMemberDetail : ' + JSON.stringify(data));
  return data;
});
