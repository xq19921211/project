/**
 * Created by xu.long on 2018/5/21.
 */
import { createSelector } from 'reselect';

const data = state => state.commodityDetailReducer.data;

export const getCommodityDetail = createSelector([data], data => {
  console.log('selector getLoginResult : ' + JSON.stringify(data));
  return data;
});
