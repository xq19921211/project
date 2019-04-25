/**
 * Created by xu.long on 2018/5/18.
 */
import { createSelector } from 'reselect';

const data = state => state.merchantManagementReducer.data;

export const getMerchantList = createSelector([data], data => {
  console.log('selector getMerchantList : ' + JSON.stringify(data));
  return data;
});
