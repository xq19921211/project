/**
 * Created by xu.long on 2018/5/19.
 */
import { createSelector } from 'reselect';

const data = state => state.orderReducer.data;

export const getOrderList = createSelector([data], data => {
  console.log('selector getOrderList : ' + JSON.stringify(data));
  return data;
});
